/* eslint-disable no-console */
// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import semver from 'semver';
import webpack from 'webpack';
import glob from 'glob';

import paths from '../../../../paths';
import NPM from './NPM';
import createWebpackConfig from './createWebpackConfig';

// TODO: rimraf build cache

glob(path.join(paths.packages, './*/package.json'), (error, filenames) => {
  filenames.forEach(filename => {
    // $FlowIssue: https://github.com/facebook/flow/issues/2692
    const packageJSON = require(filename);
    // we can publish only public packages
    if (packageJSON.private === false) {
      const packageFolder = path
        .dirname(filename)
        .replace(new RegExp(paths.packages + '/'), '');

      NPM.getPackageInfo(
        {
          package: packageJSON.name,
        },
        (error, data /*, raw, res*/) => {
          if (error) {
            if (error.statusCode !== 404) {
              // 404 indicates that the package doesn't exist (yet)
              throw error;
            }
          }

          if (semver.gt(packageJSON.version, data.latest ?? '0.0.0')) {
            webpack(
              createWebpackConfig(packageFolder, packageJSON),
              async (err, stats) => {
                if (err || stats.hasErrors()) {
                  console.error(err);
                }

                console.log(
                  stats.toString({
                    colors: true,
                  }),
                );

                await tar.create(
                  {
                    gzip: true,
                    cwd: paths.buildCache,
                    portable: true,
                    file: path.join(paths.buildCache, packageFolder + '.tgz'),
                  },
                  [packageFolder],
                );

                NPM.publishPackage(
                  {
                    metadata: packageJSON,
                    body: fs.createReadStream(
                      path.join(paths.buildCache, packageFolder + '.tgz'),
                    ),
                  },
                  () => {
                    console.warn(
                      `PUBLISHED ${packageJSON.name} version ${
                        packageJSON.version
                      } 🎉`,
                    );
                  },
                );
              },
            );
          } else {
            console.warn(
              `Skipping release of ${
                packageJSON.name
              } - there is nothing to release`,
            );
          }
        },
      );
    }
  });
});
