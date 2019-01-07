/* eslint-disable no-console */
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

type Options = {|
  +buildCache: string,
  +packages: string,
  +dryRun: boolean,
|};

export default function publish(options: Options) {
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

                      // $FlowPullRequest: https://github.com/facebook/flow/pull/7231
                      fs.mkdirSync(path.dirname(destinationFileName), {
                        recursive: true,
                      });

                      console.warn(`${filename} -> ${destinationFileName}`);

                      fs.writeFileSync(
                        destinationFileName,
                        transformFileSync(filename).code,
                      );
                    });

                    // These files are optional:
                    ['CHANGELOG.md'].forEach(filenameToCopy => {
                      const pathToCopy = path.join(
                        packageFolderPath,
                        filenameToCopy,
                      );
                      try {
                        fs.accessSync(pathToCopy, fs.constants.F_OK);
                        fs.copyFileSync(
                          pathToCopy,
                          path.join(
                            options.buildCache,
                            packageFolderName,
                            filenameToCopy,
                          ),
                        );
                      } catch (error) {
                        // noop - file doesn't exist
                      }
                    });

                    // These files are required:
                    ['README.md', 'package.json'].forEach(filenameToCopy => {
                      fs.copyFileSync(
                        path.join(packageFolderPath, filenameToCopy),
                        path.join(
                          options.buildCache,
                          packageFolderName,
                          filenameToCopy,
                        ),
                      );
                    });

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
                        () => {
                          console.warn(
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
              console.warn(
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
