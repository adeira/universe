/* eslint-disable no-console */
// @flow

import fs from 'fs';
import tar from 'tar';
import path from 'path';
import semver from 'semver';
import webpack from 'webpack';

import paths from '../../../../paths';
import NPM from './NPM';
import createWebpackConfig from './createWebpackConfig';

// TODO: rimraf build cache

['graphql-resolve-wrapper', 'logz'].forEach(packageFolder => {
  // $FlowIssue: https://github.com/facebook/flow/issues/2692
  const packageJSON = require(path.join(
    paths.packages,
    packageFolder,
    'package.json',
  ));

  NPM.getPackageInfo(
    {
      package: packageJSON.name,
    },
    (error, data /*, raw, res*/) => {
      if (error) {
        throw error;
      }

      if (semver.gt(packageJSON.version, data.latest)) {
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
});
