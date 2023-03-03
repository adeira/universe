// @flow

import fs from 'fs';
import { transformFileSync } from '@babel/core';

import log from './log';

function writeFileSync(path: string, data: string): void {
  fs.writeFileSync(
    path,
    data.replace(
      /\/\/\s+BEGIN-ADEIRA-UNIVERSE-INTERNAL[\w\W]+?END-ADEIRA-UNIVERSE-INTERNAL/g,
      '// PLACEHOLDER-ADEIRA-UNIVERSE-INTERNAL',
    ),
  );
}

export default function transformFileVariants(
  originalFilename: string,
  destinationFilename: string,
  reactRuntime?: 'automatic' | 'classic',
): void {
  const getBabelConfig = (target: 'js' | 'flow') => {
    return {
      rootMode: 'upward',
      presets: [
        [
          '@adeira/babel-preset-adeira',
          {
            target,
            reactRuntime: reactRuntime ?? 'automatic',
          },
        ],
      ],
    };
  };

  // 1) transform JS version (CommonJS)
  try {
    log('%s 👉 %s', originalFilename, destinationFilename);
    writeFileSync(
      destinationFilename,
      transformFileSync(originalFilename, getBabelConfig('js')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }

  // 2) transform Flow version
  try {
    const modifiedDestinationFilename = `${destinationFilename}.flow`;
    log('%s 👉 %s', originalFilename, modifiedDestinationFilename);
    writeFileSync(
      modifiedDestinationFilename,
      transformFileSync(originalFilename, getBabelConfig('flow')).code,
    );
  } catch (error) {
    log(error);
    process.exit(1);
  }
}
