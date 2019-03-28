// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import semver from 'semver';
import rimraf from 'rimraf';
import { transformFileSync } from '@babel/core';
import packlist from 'npm-packlist';

import findNPMPackages from './findNPMPackages';
import NPM from './NPM';
import log from './log';

type Options = {|
  +buildCache: string,
  +packages: string,
  +dryRun: boolean,
|};

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
              packlist({ path: packageFolderPath }).then(filenames => {
                return filenames.forEach(filename => {
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

                  tar
                    .create(
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
                    )
                    .then(() => {
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
                    });
                });
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

function transformFileVariants(originalFilename, destinationFilename) {
  const getBabelConfig = (target: 'js' | 'flow') => {
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

  // 2) transform Flow version
  try {
    log(`${originalFilename} -> ${destinationFilename}.flow`);
    fs.writeFileSync(
      destinationFilename + '.flow',
      transformFileSync(originalFilename, getBabelConfig('flow')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }
}
