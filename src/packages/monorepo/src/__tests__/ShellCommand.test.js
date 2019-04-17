// @flow

import path from 'path';
import nodeChildProcess from 'child_process'; // eslint-disable-line no-restricted-imports

import ShellCommand from '../ShellCommand';

// These tests actually run the commands - not sure if it's a good idea but
// should be fine since they are mostly Node anyway.

it("throws exception when command doesn't exit", () => {
  expect(() =>
    new ShellCommand(null, 'this_command_does_not_exit').runSynchronously(),
  ).toThrowError('spawnSync this_command_does_not_exit ENOENT');

  // but it's possible to suppress this error:
  expect(() =>
    new ShellCommand(null, 'this_command_does_not_exit')
      .setNoExceptions()
      .runSynchronously(),
  ).not.toThrow();
});

it('throws exception when command exits with signal', () => {
  expect(() =>
    new ShellCommand(
      path.join(__dirname, 'ShellCommandFixtures'),
      'node',
      'kill.js',
    ).runSynchronously(),
  ).toThrowError('Command killed with signal SIGINT.');

  // but it's possible to suppress this error:
  expect(() =>
    new ShellCommand(
      path.join(__dirname, 'ShellCommandFixtures'),
      'node',
      'kill.js',
    )
      .setNoExceptions()
      .runSynchronously(),
  ).not.toThrow();
});

it('throws exception when command exits with error code', () => {
  expect(() =>
    new ShellCommand(
      path.join(__dirname, 'ShellCommandFixtures'),
      'node',
      'exit.js',
    ).runSynchronously(),
  ).toThrowError('Command failed with exit code 5.');

  // but it's possible to suppress this error:
  expect(() =>
    new ShellCommand(
      path.join(__dirname, 'ShellCommandFixtures'),
      'node',
      'exit.js',
    )
      .setNoExceptions()
      .runSynchronously(),
  ).not.toThrow();
});

it('returns stdout when executed without any error', () => {
  expect(
    new ShellCommand(
      path.join(__dirname, 'ShellCommandFixtures'),
      'node',
      'success.js',
    ).runSynchronously(),
  ).toBe('output from success.js');
});

it('returns empty string when printing to screen', () => {
  expect(
    new ShellCommand(
      path.join(__dirname, 'ShellCommandFixtures'),
      'node',
      'success.js',
    )
      .setOutputToScreen()
      .runSynchronously(),
  ).toBe('');
});

it('executes the underlying child process correctly -- output to screen', () => {
  const spy = jest
    .spyOn(nodeChildProcess, 'spawnSync')
    .mockImplementation(() => ({
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
  expect(spy).toHaveBeenCalledWith(
    'some_command',
    ['-x', '-x', '--abc', 'string'],
    {
      cwd: expect.any(String),
      input: undefined,
      stdio: ['inherit', 'inherit', 'inherit'],
    },
  );
  spy.mockRestore();
});

it('executes the underlying child process correctly -- returns output', () => {
  const spy = jest
    .spyOn(nodeChildProcess, 'spawnSync')
    .mockImplementation(() => ({
      error: undefined,
      signal: null,
      status: 0, // success
    }));
  new ShellCommand(null, 'some_command').runSynchronously();
  expect(spy).toHaveBeenCalledWith('some_command', [], {
    cwd: expect.any(String),
    input: undefined,
    stdio: ['inherit', 'pipe', 'pipe'],
  });
  spy.mockRestore();
});
