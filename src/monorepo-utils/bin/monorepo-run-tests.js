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
const ciNode = {
  // nodes are indexed from 1 (not zero)
  index: Number(process.env.CI_NODE_INDEX == null ? 1 : process.env.CI_NODE_INDEX),
  total: Number(process.env.CI_NODE_TOTAL == null ? 1 : process.env.CI_NODE_TOTAL),
};

if (externalConfig.includes('--all')) {
  TestsRunner.runAllTests(externalConfig, ciNode);
} else {
  const setupFiles = [
    '.jest.config.js',
    ...(jestConfig.setupFilesAfterEnv == null ? [] : jestConfig.setupFilesAfterEnv),
    ...(jestConfig.setupFiles == null ? [] : jestConfig.setupFiles),
  ].map((file) => path.relative(process.cwd(), file));

  TestsRunner.runTests(externalConfig, ciNode, setupFiles);
}
