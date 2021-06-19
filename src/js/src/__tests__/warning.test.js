// @flow strict

import { disallowWarnings, expectWarningWillFire } from '@adeira/jest-disallow-console';

import { warning } from '../index';

disallowWarnings();

it('does not print warning for successful condition', () => {
  expect(() => warning(true, 'error message')).not.toThrow();
});

it('prints a warning for unsuccessful condition', () => {
  expectWarningWillFire('error message');
  warning(false, 'error message');
});

it('uses sprintf behind the scenes', () => {
  expectWarningWillFire('Oh, yeah!');
  warning(false, 'Oh, %s', 'yeah!');
});

it('complains when used without a warning message', () => {
  // $FlowExpectedError[incompatible-call]: warning requires second argument
  expect(() => warning(false)).toThrowErrorMatchingInlineSnapshot(
    '"`warning(condition, format, ...args)` requires a warning message argument"',
  );
});
