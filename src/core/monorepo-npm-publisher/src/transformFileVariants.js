// @flow

import fs from 'fs';
import { transformFileSync } from '@babel/core';

import log from './log';

export default function transformFileVariants(
  originalFilename: string,
  destinationFilename: string,
  transpileESM: boolean,
): void {
  const getBabelConfig = (target: 'js' | 'js-esm' | 'flow') => {
    // TODO: load Babel config from the packages instead (if exists)
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
    log('%s 👉 %s', originalFilename, destinationFilename);
    fs.writeFileSync(
      destinationFilename,
      transformFileSync(originalFilename, getBabelConfig('js')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }

  // 2) transform JS-ESM version
  if (transpileESM !== false) {
    try {
      const modifiedDestinationFilename = destinationFilename.replace(
        /\.js$/,
        '.mjs',
      );
      log('%s 👉 %s', originalFilename, modifiedDestinationFilename);
      fs.writeFileSync(
        modifiedDestinationFilename,
        transformFileSync(originalFilename, getBabelConfig('js-esm')).code,
      );
    } catch (error) {
      log(error);
      process.exit(1);
    }
  }

  // 3) transform Flow version
  try {
    const modifiedDestinationFilename = `${destinationFilename}.flow`;
    log('%s 👉 %s', originalFilename, modifiedDestinationFilename);
    fs.writeFileSync(
      modifiedDestinationFilename,
      transformFileSync(originalFilename, getBabelConfig('flow')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }
}
