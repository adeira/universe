#!/usr/bin/env node

// @flow

const path = require('path');

const whitelistedNodeFlags = [
  '--inspect',
  '--inspect-brk',
  // TODO: v8flags (?)
];

const flags = {
  argv: [],
  execArgv: [],
};

process.argv.forEach(arg => {
  if (whitelistedNodeFlags.includes(arg)) {
    flags.execArgv.push(arg);
  } else {
    flags.argv.push(arg);
  }
});

const cwd = process.cwd();

const scriptPath = path.join(cwd, flags.argv[2]);
const scriptArgs = flags.argv.splice(3);

require('child_process').fork(
  path.join(__dirname, 'monorepo-babel-node-runner.js'),
  [scriptPath, ...scriptArgs],
  {
    cwd,
    execArgv: process.execArgv.concat(flags.execArgv),
  },
);
