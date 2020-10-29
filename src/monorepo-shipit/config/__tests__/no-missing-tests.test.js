// @flow strict-local

import fs from 'fs';
import path from 'path';
import { globSync } from '@adeira/monorepo-utils';

const configFilenames = globSync('/**/*.js', {
  root: path.join(__dirname, '..'),
  ignore: [
    '**/node_modules/**',
    '**/__[a-z]*__/**', // ignore __tests__, __mocks__, ...
  ],
});

test.each(configFilenames)('config %s has a test file', (configFilename) => {
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
