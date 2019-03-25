#!/usr/bin/env node

// @flow

const TestsRunner = require('../src/TestsRunner');

const externalConfig = process.argv.slice(2);
const ciNode = {
  // nodes are indexed from 1 (not zero)
  index: Number(process.env.CI_NODE_INDEX ?? 1),
  total: Number(process.env.CI_NODE_TOTAL ?? 1),
};

if (externalConfig.includes('--all')) {
  TestsRunner.runAllTests(externalConfig, ciNode);
} else {
  TestsRunner.runTests(externalConfig, ciNode);
}
