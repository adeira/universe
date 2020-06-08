#!/usr/bin/env node

// @flow strict

const os = require('os');
const path = require('path');
const ChildProcess = require('child_process');

const flags = {
  argv: [],
  execArgv: [],
};

process.argv.forEach((arg) => {
  if (process.allowedNodeEnvironmentFlags.has(arg)) {
    flags.execArgv.push(arg);
  } else {
    flags.argv.push(arg);
  }
});

const scriptPath = path.join(process.cwd(), flags.argv[2]);
const scriptArgs = flags.argv.splice(3);

if (process.env.NODE_ENV === 'production') {
  const filename = path.basename(__filename).replace(/\.js$/, '');
  // eslint-disable-next-line no-console
  console.warn(
    `${os.EOL}You are using "${filename}" in production mode which is highly discouraged!${os.EOL}`,
  );
}

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
