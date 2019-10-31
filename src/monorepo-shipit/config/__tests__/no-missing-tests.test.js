// @flow strict-local

import fs from 'fs';
import path from 'path';
import { globSync } from '@kiwicom/monorepo-utils';

test('there is a test file for every config file', () => {
  const configFilenames = globSync('/**/*.js', {
    root: path.join(__dirname, '..'),
    ignore: [
      '**/node_modules/**',
      '**/__[a-z]*__/**', // ignore __tests__, __mocks__, ...
    ],
  });
  configFilenames.forEach(configFilename => {
    const testFilename = configFilename.replace(
      /^(?<path>.+?)(?<file>[^/]+)\.js$/,
      `$1__tests__${path.sep}$2.test.js`,
    );
    expect({
      isOK: fs.existsSync(testFilename),
      testFilename,
    }).toEqual({
      isOK: true,
      testFilename,
    });
  });
});
