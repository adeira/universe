// @flow strict

import _esc from '../_esc';

const ESCAPED = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\';
const UNESCAPED = '^$.*+?()[]{}|\\';

it('should escape values', function () {
  expect(_esc(UNESCAPED + UNESCAPED)).toStrictEqual(ESCAPED + ESCAPED);
});

it('should handle strings with nothing to escape', function () {
  expect(_esc('abc')).toStrictEqual('abc');
});
