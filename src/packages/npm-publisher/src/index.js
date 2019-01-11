// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import semver from 'semver';
import glob from 'glob';
import rimraf from 'rimraf';
import { transformFileSync } from '@babel/core';
import flowCopySource from 'flow-copy-source';

import findNPMPackages from './findNPMPackages';
import NPM from './NPM';
import log from './log';
import copyFile from './copyFile';

type Options = {|
  +babelConfigFile: string,
  +buildCache: string,
  +packages: string,
  +dryRun: boolean,
|};

const filesToCopy = {
  // false = optional ; true = required
  'CHANGELOG.md': false,
  'README.md': true,
  'package.json': true,
};

export default function publish(options: Options) {
  if (options.dryRun) {
    log('DRY RUN');
  }

  rimraf(options.buildCache, () => {
    findNPMPackages(
      options.packages,
      ({ packageFolderPath, packageFolderName, packageJSONFile }) => {
        NPM.getPackageInfo(
          {
            package: packageJSONFile.name,
          },
          (error, data /* , raw, res */) => {
            if (error) {
              if (error.statusCode !== 404) {
                // 404 indicates that the package doesn't exist (yet)
                throw error;
              }
            }

            if (semver.gt(packageJSONFile.version, data.latest ?? '0.0.0')) {
              flowCopySource(
                [packageFolderPath],
                path.join(options.buildCache, packageFolderName),
                {
                  verbose: true,
                  ignore: '**/__tests__/**',
                },
              ).then(() => {
                glob(
                  path.join(packageFolderPath, './**/*.js'),
                  async (error, filenames) => {
                    filenames.forEach(filename => {
                      if (
                        filename.match(/__(tests|mocks|snapshots|fixtures)__/)
                      ) {
                        return;
                      }

                      const destinationFileName = path.join(
                        options.buildCache,
                        packageFolderName,
                        filename.replace(packageFolderPath, ''),
                      );

                      fs.mkdirSync(path.dirname(destinationFileName), {
                        recursive: true,
                      });

                      log(`${filename} -> ${destinationFileName}`);

                      try {
                        fs.writeFileSync(
                          destinationFileName,
                          transformFileSync(filename, {
                            babelrc: false,
                            configFile: options.babelConfigFile,
                          }).code,
                        );
                      } catch (error) {
                        log(error);
                        process.exit(1);
                      }
                    });

                    Object.entries(filesToCopy).forEach(
                      ([fileToCopy, required]) =>
                        copyFile(
                          path.join(packageFolderPath, fileToCopy),
                          path.join(
                            options.buildCache,
                            packageFolderName,
                            fileToCopy,
                          ),
                          // $FlowIssue: https://github.com/facebook/flow/issues/2174
                          required,
                        ),
                    );

                    await tar.create(
                      {
                        gzip: true,
                        cwd: options.buildCache,
                        portable: true,
                        file: path.join(
                          options.buildCache,
                          packageFolderName + '.tgz',
                        ),
                      },
                      [packageFolderName],
                    );

                    if (options.dryRun === false) {
                      NPM.publishPackage(
                        {
                          metadata: packageJSONFile,
                          body: fs.createReadStream(
                            path.join(
                              options.buildCache,
                              packageFolderName + '.tgz',
                            ),
                          ),
                        },
                        error => {
                          if (error) {
                            throw error;
                          }

                          log(
                            `PUBLISHED ${packageJSONFile.name} version ${
                              packageJSONFile.version
                            } 🎉`,
                          );
                        },
                      );
                    }
                  },
                );
              });
            } else {
              log(
                `Skipping release of ${
                  packageJSONFile.name
                } - there is nothing to release`,
              );
            }
          },
        );
      },
    );
  });
}
