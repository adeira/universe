// @flow

import path from 'path';
import nodeChildProcess from 'child_process';

import ShellCommand from '../ShellCommand';

it("throws exception when command doesn't exit", () => {
  // this test actually runs the command - not sure if it's a good idea
  const command = new ShellCommand(null, 'this_command_does_not_exit');
  expect(() => command.runSynchronously()).toThrowError(
    'spawnSync this_command_does_not_exit ENOENT',
  );
});

it('throws exception when command exits with signal', () => {
  const command = new ShellCommand(
    path.join(__dirname, 'ShellCommandFixtures'),
    'node',
    'kill.js',
  );
  expect(() => command.runSynchronously()).toThrowError(
    'Command killed with signal SIGINT.',
  );
});

it('throws exception when command exits with error code', () => {
  const command = new ShellCommand(
    path.join(__dirname, 'ShellCommandFixtures'),
    'node',
    'exit.js',
  );
  expect(() => command.runSynchronously()).toThrowError(
    'Command failed with exit code 5.',
  );
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

it('executes the underlying child process correctly', () => {
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
    '--abc',
  )
    .setOutputToScreen()
    .runSynchronously();
  expect(spy).toHaveBeenCalledWith('some_command', ['-x', '-x', '--abc'], {
    cwd: expect.any(String),
    input: undefined,
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  spy.mockRestore();
});
