#!/usr/bin/env node

// @flow

const path = require('path');

const jestConfig = require(path.join(process.cwd(), '.jest.config.js'));

// BEGIN-ADEIRA-UNIVERSE-INTERNAL
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward',
});
// END-ADEIRA-UNIVERSE-INTERNAL

const TestsRunner = require('../src/TestsRunner');

const externalConfig = process.argv.slice(2);

if (externalConfig.includes('--all')) {
  TestsRunner.runAllTests(externalConfig);
} else {
  const setupFiles = [
    '.jest.config.js',
    ...(jestConfig.setupFilesAfterEnv == null ? [] : jestConfig.setupFilesAfterEnv),
    ...(jestConfig.setupFiles == null ? [] : jestConfig.setupFiles),
  ].map((file) => path.relative(process.cwd(), file));

  TestsRunner.runTests(externalConfig, setupFiles);
}
