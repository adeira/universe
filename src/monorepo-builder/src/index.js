// @flow

import os from 'os';
import fs, { promises as fsPromise } from 'fs';
import path from 'path';
import util from 'util';
import rimraf from 'rimraf';
import { transformFileSync } from '@babel/core';
import { globSync, findMonorepoRoot, ShellCommand } from '@kiwicom/monorepo-utils';
import { invariant } from '@adeira/js';
import logger from '@kiwicom/logger';

import findRelatedWorkspaceLocations from './findRelatedWorkspaceLocations';

const argv = process.argv.splice(2);
invariant(
  argv.length === 2 || argv.length === 3,
  'Monorepo builder expects two arguments: root workspace name and build directory name (optionally production only installation flag)',
);

const rootWorkspace = argv[0];
const buildDirName = argv[1];
const productionOnly = argv[2] === '--production';

const workspaces = JSON.parse(
  JSON.parse(
    new ShellCommand(null, 'yarn', 'workspaces', 'info', '--json').runSynchronously().getStdout(),
  ).data,
);

// TODO: we should probably skip devDeps (currently even Skymock is traversed)
const locations = findRelatedWorkspaceLocations(workspaces, rootWorkspace);

const monorepoRoot = findMonorepoRoot();
const buildDir = path.join(os.tmpdir(), buildDirName);
const projectRoots = [...locations].map(location => path.join(monorepoRoot, location));

let filesCounter = 1;
function logFromTo(absoluteFrom, absoluteTo) {
  logger.log(
    '%s, %s 👉 %s',
    String(filesCounter++),
    absoluteFrom.replace(monorepoRoot, ''),
    absoluteTo.replace(buildDir, '<BUILD_DIR>'),
  );
}

function copyFileSync(absoluteFrom, absoluteTo) {
  logFromTo(absoluteFrom, absoluteTo);
  fs.mkdirSync(path.dirname(absoluteTo), { recursive: true });
  fs.copyFileSync(absoluteFrom, absoluteTo);
}

function copyAndTranspileFileSync(absoluteFrom, absoluteTo, babelConfig) {
  logFromTo(absoluteFrom, absoluteTo);
  fs.mkdirSync(path.dirname(absoluteTo), { recursive: true });
  fs.writeFileSync(absoluteTo, transformFileSync(absoluteFrom, babelConfig).code);
}

const rimrafPromise = util.promisify(rimraf);

const globIgnore = [
  '**/node_modules/**',
  '**/__[a-z]*__/**', // ignore __tests__, __mocks__, ...
];

(async function() {
  await rimrafPromise(buildDir);

  // 1) + 2) copy source files recursively
  for (const projectRoot of projectRoots) {
    const rawFileNames = globSync('/**/*.*', {
      root: projectRoot,
      ignore: globIgnore,
    });
    for (const rawFileName of rawFileNames) {
      const destinationFilename = path.join(buildDir, rawFileName.replace(monorepoRoot, ''));
      if (rawFileName.endsWith('.js')) {
        copyAndTranspileFileSync(rawFileName, destinationFilename, {
          cwd: projectRoot,
          rootMode: 'upward',
        });
      } else {
        copyFileSync(rawFileName, destinationFilename);
      }
    }
  }

  // 3) copy root package.json and yarn.lock so we can install the node_module deps
  // $FlowAllowDynamicImport
  const packageJSON = require(path.join(monorepoRoot, 'package.json'), 'utf8');
  await fsPromise.writeFile(
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
  copyFileSync(path.join(monorepoRoot, 'yarn.lock'), path.join(buildDir, 'yarn.lock'));

  // 4) copy Yarn itself, Yarn config and offline mirror
  copyFileSync(path.join(monorepoRoot, '.yarnrc'), path.join(buildDir, '.yarnrc'));
  const rawFileNames = globSync('/**/*.*', {
    root: path.join(monorepoRoot, '.yarn'),
    ignore: globIgnore,
  });
  for (const rawFileName of rawFileNames) {
    const destinationFilename = path.join(buildDir, rawFileName.replace(monorepoRoot, ''));
    copyFileSync(rawFileName, destinationFilename);
  }

  logger.log('Transpiled into: %s', buildDir);

  // 5) install dependencies
  new ShellCommand(
    buildDir,
    'yarn',
    'install',
    '--offline',
    '--pure-lockfile',
    '--non-interactive',
    productionOnly ? '--production' : '',
  )
    .setOutputToScreen()
    .runSynchronously();

  // 6) delete Yarn offline mirror
  await rimrafPromise(path.join(buildDir, '.yarn', 'cache'));
  logger.log('DONE');
})();
