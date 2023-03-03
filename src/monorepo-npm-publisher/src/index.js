// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import semver from 'semver';
import { Workspaces } from '@adeira/monorepo-utils';
import isCI from 'is-ci';
import chalk from 'chalk';

import log from './utils/log';
import NPM from './NPM';
import transformFileVariants from './utils/transformFileVariants';
import { collectFilenames } from './utils/collectFilenames';
import { resetBuildCache } from './utils/resetBuildCache';

type Options = {
  +dryRun: boolean,
  +buildCache: string,
  +npmAuthToken: string,
  +workspaces: Set<string>,
  +reactRuntime?: 'automatic' | 'classic',
};

export default async function publish(options: Options) {
  log('NPM publisher %s', require('../package.json').version);

  if (options.dryRun) {
    log('\nDRY RUN\n');
  } else if (isCI === false) {
    log('NPM publisher can be executed only from CI environment.');
    process.exit(1);
  }

  await resetBuildCache(options.buildCache);

  Workspaces.iterateWorkspaces(async (packageJSONLocation) => {
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

      try {
        const data = await NPM.getPackageInfo({
          package: packageName,
          npmAuthToken: options.npmAuthToken,
        });

        const latest = data.latest;
        if (!semver.gt(packageJSONFile.version, latest)) {
          log(
            '✅ Skipping %s because there is nothing to release (latest: %s)',
            chalkPackageName,
            latest,
          );
        } else {
          log('🚀 Preparing %s for release (latest: %s)', chalkPackageName, latest);

          const filenames = await collectFilenames(packageFolderPath);
          for (const filename of filenames) {
            const destinationFileName = path.join(options.buildCache, packageFolderName, filename);

            fs.mkdirSync(path.dirname(destinationFileName), {
              recursive: true,
            });

            if (filename.endsWith('.js')) {
              // this transforms and copy the file
              transformFileVariants(
                path.join(packageFolderPath, filename),
                destinationFileName,
                options.reactRuntime,
              );
            } else {
              // this just copies rest of the files
              const originalFilename = path.join(packageFolderPath, filename);
              log('%s 👉 %s', originalFilename, destinationFileName);
              fs.copyFileSync(originalFilename, destinationFileName);
            }
          }

          await tar.create(
            {
              gzip: true,
              cwd: options.buildCache,
              portable: true,
              file: path.join(options.buildCache, `${packageFolderName}.tgz`),
            },
            [packageFolderName],
          );

          if (options.dryRun === false) {
            await NPM.publishPackage({
              metadata: packageJSONFile,
              /* $FlowFixMe[class-object-subtyping] This comment suppresses an
               * error when upgrading Flow to version 0.153.0. To see the error
               * delete this comment and run Flow. */
              body: fs.createReadStream(path.join(options.buildCache, `${packageFolderName}.tgz`)),
              npmAuthToken: options.npmAuthToken,
            });

            log('👍 PUBLISHED %s version %s', chalkPackageName, packageJSONFile.version);
          } else {
            log('❌ Skipped publishing of %s because of DRY RUN.', chalkPackageName);
          }
        }
      } catch (e) {
        process.exitCode = 1;
        log('❌ Skipping %s because of NPM error: %s', chalkPackageName, e.message);
      }
    }
  });
}
