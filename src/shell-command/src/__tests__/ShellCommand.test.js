// @flow strict

import path from 'path';
import nodeChildProcess from 'child_process';

import ShellCommand from '../ShellCommand';

// These tests actually run the commands - not sure if it's a good idea but
// should be fine since they are mostly Node anyway.

it("throws exception when command doesn't exit", () => {
  expect(() => new ShellCommand(null, 'this_command_does_not_exit').runSynchronously()).toThrow(
    'spawnSync this_command_does_not_exit ENOENT',
  );

  // but it's possible to suppress this error:
  let exitCode;
  expect(() => {
    exitCode = new ShellCommand(null, 'this_command_does_not_exit')
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
  }).not.toThrow();
  expect(exitCode).toBe(1);
});

it('throws exception when command exits with signal', () => {
  expect(() =>
    new ShellCommand(path.join(__dirname, 'fixtures'), 'node', 'kill.js').runSynchronously(),
  ).toThrow('Command killed with signal SIGINT.');

  // but it's possible to suppress this error:
  let exitCode;
  expect(() => {
    exitCode = new ShellCommand(path.join(__dirname, 'fixtures'), 'node', 'kill.js')
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
  }).not.toThrow();
  expect(exitCode).toBe(1);
});

it('throws exception when command exits with error code', () => {
  expect(() =>
    new ShellCommand(path.join(__dirname, 'fixtures'), 'node', 'exit.js').runSynchronously(),
  ).toThrow('Command failed with exit code 5.');

  // but it's possible to suppress this error:
  let exitCode;
  expect(() => {
    exitCode = new ShellCommand(path.join(__dirname, 'fixtures'), 'node', 'exit.js')
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
  }).not.toThrow();
  expect(exitCode).toBe(5);
});

it('returns stdout and stderr by default', () => {
  expect(
    new ShellCommand(path.join(__dirname, 'fixtures'), 'node', 'success.js').runSynchronously(),
  ).toEqual({
    exitCode: 0,
    stderr: 'console.err output',
    stdout: 'console.log output',
  });
});

it('returns empty strings when printing to screen', () => {
  expect(
    new ShellCommand(path.join(__dirname, 'fixtures'), 'node', 'success.js')
      .setOutputToScreen()
      .runSynchronously(),
  ).toEqual({
    exitCode: 0,
    stderr: '',
    stdout: '',
  });
});

it('executes the underlying child process correctly -- output to screen', () => {
  const spy = jest.spyOn(nodeChildProcess, 'spawnSync').mockImplementation(() => ({
    error: undefined,
    signal: null,
    status: 0, // success
  }));
  new ShellCommand(
    null,
    'some_command',
    '-x', // duplicated on purpose
    '-x', // duplicated on purpose
    '', // this should be filtered out
    '--abc',
    'string',
  )
    .setOutputToScreen()
    .runSynchronously();
  expect(spy).toHaveBeenCalledWith('some_command', ['-x', '-x', '--abc', 'string'], {
    cwd: expect.any(String),
    input: undefined,
    stdio: ['inherit', 'inherit', 'inherit'],
    maxBuffer: Infinity,
  });
  spy.mockRestore();
});

it('executes the underlying child process correctly -- returns output with stdin', () => {
  const spy = jest.spyOn(nodeChildProcess, 'spawnSync').mockImplementation(() => ({
    error: undefined,
    signal: null,
    status: 0, // success
  }));
  new ShellCommand(null, 'some_command').setStdin('custom playload').runSynchronously();
  expect(spy).toHaveBeenCalledWith('some_command', [], {
    cwd: expect.any(String),
    input: 'custom playload',
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: Infinity,
  });
  spy.mockRestore();
});

it('executes the underlying child process correctly -- with environment variables', () => {
  const spy = jest.spyOn(nodeChildProcess, 'spawnSync').mockImplementation(() => ({
    error: undefined,
    signal: null,
    status: 0, // success
  }));
  new ShellCommand(null, 'some_command')
    .setEnvironmentVariables(new Map([['GIT_CONFIG_NOSYSTEM', '1']]))
    .runSynchronously();
  expect(spy).toHaveBeenCalledWith('some_command', [], {
    cwd: expect.any(String),
    env: new Map([['GIT_CONFIG_NOSYSTEM', '1']]),
    stdio: ['inherit', 'pipe', 'pipe'],
    maxBuffer: Infinity,
  });
  spy.mockRestore();
});
