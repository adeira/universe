// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { transformFileSync } from '@babel/core';
import {
  globSync,
  findRootPackageJsonPath,
  ShellCommand,
} from '@kiwicom/monorepo-utils';
import logger from '@kiwicom/logger';

const workspaces = JSON.parse(
  JSON.parse(
    new ShellCommand(null, 'yarn', 'workspaces', 'info', '--json')
      .runSynchronously()
      .getStdout(),
  ).data,
);

// TODO: we should probably skip devDeps (currently even Skymock is traversed)
const locations = new Set();
function collectLocations(workspaceName) {
  const workspace = workspaces[workspaceName];
  locations.add(workspace.location);
  for (const workspaceDependency of workspace.workspaceDependencies) {
    collectLocations(workspaceDependency);
  }
}
collectLocations('@kiwicom/graphql'); // TODO: only GraphQL for now

const monorepoRoot = path.dirname(findRootPackageJsonPath());
const buildDir = path.join(os.tmpdir(), 'com.kiwi.graphql.build');
const projectRoots = [...locations].map(location =>
  path.join(monorepoRoot, location),
);

let filesCounter = 1;
function copyFileSync(absoluteFrom, absoluteTo, transpile = false) {
  logger.log(
    '%s, %s 👉 %s',
    String(filesCounter++),
    absoluteFrom.replace(monorepoRoot, ''),
    absoluteTo.replace(buildDir, '<buildDir>'),
  );
  fs.mkdirSync(path.dirname(absoluteTo), { recursive: true });
  if (transpile === true && absoluteFrom.endsWith('.js')) {
    fs.writeFileSync(
      absoluteTo,
      transformFileSync(absoluteFrom, {
        // TODO: use correct babelrc.js file from graphql
        root: __dirname, // do not lookup any other Babel config
        // $FlowAllowDynamicImport
        ...require(path.join(
          monorepoRoot,
          'src/incubator/graphql/.babelrc.js', // TODO: this should probably be per workspace (?), this is good for now
        )),
      }).code,
    );
  } else {
    fs.copyFileSync(absoluteFrom, absoluteTo);
  }
}

rimraf(buildDir, () => {
  // TODO: handle errors

  // 1) copy source codes
  for (const projectRoot of projectRoots) {
    const rawFileNames = globSync('/**/*.*', {
      root: projectRoot,
      ignore: ['**/node_modules/**', '**/__tests__/**'],
    });
    for (const rawFileName of rawFileNames) {
      const destinationFilename = path.join(
        buildDir,
        rawFileName.replace(monorepoRoot, ''),
      );
      copyFileSync(rawFileName, destinationFilename, true);
    }
  }

  // 2) copy package.json and yarn.lock so we can install the node_module deps
  // $FlowAllowDynamicImport
  const packageJSON = require(path.join(monorepoRoot, 'package.json'), 'utf8');
  fs.writeFileSync(
    path.join(buildDir, 'package.json'),
    JSON.stringify(
      {
        ...packageJSON,
        // We remove all deps from the root package.json because they are not being
        // transfered (and we shouldn't need them at all). Installation would fail otherwise.
        dependencies: {},
        devDependencies: {},
      },
      null,
      2,
    ),
  );
  copyFileSync(
    path.join(monorepoRoot, 'yarn.lock'),
    path.join(buildDir, 'yarn.lock'),
  );

  // 3) copy yarn stuff and offline mirror
  copyFileSync(
    path.join(monorepoRoot, '.yarnrc'),
    path.join(buildDir, '.yarnrc'),
  );
  const rawFileNames = globSync('/**/*.*', {
    root: path.join(monorepoRoot, '.yarn'),
  });
  for (const rawFileName of rawFileNames) {
    const destinationFilename = path.join(
      buildDir,
      rawFileName.replace(monorepoRoot, ''),
    );
    copyFileSync(rawFileName, destinationFilename);
  }

  logger.log('Transpiled into: %s', buildDir);

  // 4) install dependencies
  // y install --offline --pure-lockfile
  new ShellCommand(buildDir, 'yarn', 'install', '--offline', '--pure-lockfile')
    .setOutputToScreen()
    .runSynchronously();

  // TODO: remove offline mirror from final result (only for the build phase)
  // NODE_ENV=production LOGZIO_TOKEN='' SENTRY_DSN='' node src/incubator/graphql/src/index.js
});
