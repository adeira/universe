#!/usr/bin/env node

// @flow

const TestsRunner = require('../src/TestsRunner');

const externalConfig = process.argv.slice(2);

if (externalConfig.includes('--all')) {
  TestsRunner.runAllTests(externalConfig);
} else {
  TestsRunner.runTests(externalConfig);
}
