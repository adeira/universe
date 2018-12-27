#!/usr/bin/env node

// @flow

const TestsRunner = require('../src/TestsRunner');

if (process.argv.includes('--all')) {
  TestsRunner.runAllTests();
} else {
  TestsRunner.runTests();
}
