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

import paths from '../../../../paths';
import NPM from './NPM';

function clearCacheFolder(cb) {
  rimraf(paths.buildCache, cb);
}

function findPackages(cb) {
  glob(
    path.join(paths.packages, './*/package.json'),
    (error, packageJSONPaths) => {
      packageJSONPaths.forEach(packageJSONPath => {
        // $FlowAllowDynamicImport
        const packageJSONFile = require(packageJSONPath);
        // we can publish only public packages
        if (packageJSONFile.private === false) {
          const packageFolderPath = path.dirname(packageJSONPath);
          const packageFolderName = packageFolderPath.replace(
            new RegExp(paths.packages + '/'),
            '',
          );
          cb({
            packageFolderPath,
            packageFolderName,
            packageJSONFile,
          });
        }
      });
    },
  );
}

clearCacheFolder(() => {
  findPackages(({ packageFolderPath, packageFolderName, packageJSONFile }) => {
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
            path.join(paths.buildCache, packageFolderName),
            {
              verbose: true,
              ignore: '**/__tests__/**',
            },
          ).then(() => {
            glob(
              path.join(packageFolderPath, './**/*.js'),
              async (error, filenames) => {
                filenames.forEach(filename => {
                  if (filename.match(/__(tests|mocks|snapshots)__/)) {
                    return;
                  }

                  const destinationFileName = path.join(
                    paths.buildCache,
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

                ['README.md', 'package.json'].forEach(filenameToCopy => {
                  fs.copyFileSync(
                    path.join(packageFolderPath, filenameToCopy),
                    path.join(
                      paths.buildCache,
                      packageFolderName,
                      filenameToCopy,
                    ),
                  );
                });

                await tar.create(
                  {
                    gzip: true,
                    cwd: paths.buildCache,
                    portable: true,
                    file: path.join(
                      paths.buildCache,
                      packageFolderName + '.tgz',
                    ),
                  },
                  [packageFolderName],
                );

                NPM.publishPackage(
                  {
                    metadata: packageJSONFile,
                    body: fs.createReadStream(
                      path.join(paths.buildCache, packageFolderName + '.tgz'),
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
  });
});
