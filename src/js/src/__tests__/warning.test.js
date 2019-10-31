// @flow strict

import { warning } from '../index';

it('does not print warning for successful condition', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  expect(() => warning(true, 'error message')).not.toThrow();
  expect(consoleSpy).not.toHaveBeenCalled();
  consoleSpy.mockRestore();
});

it('prints a warning for unsuccessful condition', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  warning(false, 'error message');
  expect(consoleSpy.mock.calls).toEqual([['error message']]);
  consoleSpy.mockRestore();
});

it('uses sprintf behind the scenes', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  warning(false, 'Oh, %s', 'yeah!');
  expect(consoleSpy.mock.calls).toEqual([['Oh, yeah!']]);
  consoleSpy.mockRestore();
});

it('complains when used without a warning message', () => {
  // $FlowExpectedError: warning requires second argument
  expect(() => warning(false)).toThrowErrorMatchingInlineSnapshot(
    '"`warning(condition, format, ...args)` requires a warning message argument"',
  );
});
