/* eslint-disable no-console */
// @flow

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import paths from '../../../../paths';

const packages = ['graphql-resolve-wrapper', 'logz'];

const config = packages.map(packageName => {
  // $FlowIssue: https://github.com/facebook/flow/issues/2692
  const packageJSON = require(path.join(
    paths.packages,
    packageName,
    'package.json',
  ));

  return {
    mode: 'none',
    target: 'node',
    entry: {
      [path.join(packageName, packageJSON.main)]: path.join(
        paths.packages,
        packageName,
        packageJSON.main,
      ),
    },
    output: {
      path: paths.buildCache,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        },
      ],
    },
    externals: [nodeExternals()],
  };
});

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }

  console.log(
    stats.toString({
      colors: true,
    }),
  );

  packages.forEach(packageName => {
    const filesToCopy = ['README.md', 'package.json'];

    filesToCopy.forEach(fileName => {
      const sourceFile = path.join(paths.packages, packageName, fileName);
      const destinationFile = path.join(
        paths.buildCache,
        packageName,
        fileName,
      );

      fs.copyFile(sourceFile, destinationFile, undefined, error => {
        if (error) {
          throw error;
        }
        console.log(`${sourceFile} 👉 ${destinationFile}`);
      });
    });
  });
});
