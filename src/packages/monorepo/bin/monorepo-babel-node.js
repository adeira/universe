#!/usr/bin/env node

// @flow

const path = require('path');
const ChildProcess = require('child_process');

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

const scriptPath = path.join(process.cwd(), flags.argv[2]);
const scriptArgs = flags.argv.splice(3);

// Simple native child process fork here to avoid Babel transpilation.
const fork = ChildProcess.fork(
  path.join(__dirname, 'monorepo-babel-node-runner.js'),
  [scriptPath, ...scriptArgs],
  {
    stdio: 'inherit',
    cwd: process.cwd(),
    execArgv: process.execArgv.concat(flags.execArgv),
  },
);

fork.on('exit', (code, signal) => {
  if (signal !== null) {
    process.exit(1);
  }
  process.exit(code);
});
