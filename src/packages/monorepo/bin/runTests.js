#!/usr/bin/env node

// @flow

const TestsRunner = require('../src/TestsRunner');

let data = '';
if (process.argv.includes('--all')) {
  TestsRunner.runAllTests();
} else {
  process.stdin.on('data', chunk => {
    data += chunk;
  });
  process.stdin.on('end', () => {
    TestsRunner.runTests(JSON.parse(JSON.parse(data).data));
  });
}
