// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import util from 'util';
import semver from 'semver';
import rimraf from 'rimraf';
import { transformFileSync } from '@babel/core';
import packlist from 'npm-packlist';
import { Workspaces } from '@kiwicom/monorepo';
import isCI from 'is-ci';
import chalk from 'chalk';

import NPM from './NPM';

type Options = {|
  +dryRun: boolean,
  +buildCache: string,
  +npmAuthToken: string,
  +workspaces: Set<string>,
|};

function log(...message: $ReadOnlyArray<string>): void {
  console.warn(...message); // eslint-disable-line no-console
}

export default async function publish(options: Options) {
  log('NPM publisher %s', require('../package.json').version);

  if (options.dryRun) {
    log('\nDRY RUN\n');
  } else if (isCI === false) {
    log('NPM publisher can be executed only from CI environment.');
    process.exit(1);
  }

  await util.promisify(rimraf)(options.buildCache);

  Workspaces.iterateWorkspaces(async packageJSONLocation => {
    // $FlowAllowDynamicImport
    const packageJSONFile = require(packageJSONLocation);
    const packageName = packageJSONFile.name;
    const chalkPackageName = chalk.bold(packageName);

    if (!options.workspaces.has(packageName)) {
      log("✋ Skipping %s because it's not whitelisted", chalkPackageName);
    } else if (packageJSONFile.private === true) {
      log("❌ Skipping %s because it's PRIVATE", chalkPackageName);
    } else {
      const packageFolderPath = path.dirname(packageJSONLocation);
      const packageFolderName = path.basename(packageFolderPath);

      const data = await NPM.getPackageInfo({
        package: packageName,
        npmAuthToken: options.npmAuthToken,
      });

      if (!semver.gt(packageJSONFile.version, data.latest)) {
        log(
          '✅ Skipping %s because there is nothing to release',
          chalkPackageName,
        );
      } else {
        log('🚀 Releasing %s', chalkPackageName);

        const filenames = await packlist({ path: packageFolderPath });
        for (const filename of filenames) {
          const destinationFileName = path.join(
            options.buildCache,
            packageFolderName,
            filename,
          );

          fs.mkdirSync(path.dirname(destinationFileName), {
            recursive: true,
          });

          if (filename.endsWith('.js')) {
            // this transforms and copy the file
            transformFileVariants(
              path.join(packageFolderPath, filename),
              destinationFileName,
            );
          } else {
            fs.copyFileSync(
              path.join(packageFolderPath, filename),
              destinationFileName,
            );
          }
        }

        await tar.create(
          {
            gzip: true,
            cwd: options.buildCache,
            portable: true,
            file: path.join(options.buildCache, packageFolderName + '.tgz'),
          },
          [packageFolderName],
        );

        if (options.dryRun === false) {
          await NPM.publishPackage({
            metadata: packageJSONFile,
            body: fs.createReadStream(
              path.join(options.buildCache, packageFolderName + '.tgz'),
            ),
            npmAuthToken: options.npmAuthToken,
          });

          log(
            '👍 PUBLISHED %s version %s',
            chalkPackageName,
            packageJSONFile.version,
          );
        }
      }
    }
  });
}

function transformFileVariants(originalFilename, destinationFilename): void {
  const getBabelConfig = (target: 'js' | 'js-esm' | 'flow') => {
    return {
      root: __dirname, // do not lookup any other Babel config
      presets: [
        [
          '@kiwicom/babel-preset-kiwicom',
          {
            target,
          },
        ],
      ],
    };
  };

  // 1) transform JS version
  try {
    log(`${originalFilename} -> ${destinationFilename}`);
    fs.writeFileSync(
      destinationFilename,
      transformFileSync(originalFilename, getBabelConfig('js')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }

  // 2) transform JS-ESM version
  try {
    const modifiedDestinationFilename = destinationFilename.replace(
      /\.js$/,
      '.mjs',
    );
    log(`${originalFilename} -> ${modifiedDestinationFilename}`);
    fs.writeFileSync(
      modifiedDestinationFilename,
      transformFileSync(originalFilename, getBabelConfig('js-esm')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }

  // 3) transform Flow version
  try {
    const modifiedDestinationFilename = destinationFilename + '.flow';
    log(`${originalFilename} -> ${modifiedDestinationFilename}`);
    fs.writeFileSync(
      modifiedDestinationFilename,
      transformFileSync(originalFilename, getBabelConfig('flow')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }
}
