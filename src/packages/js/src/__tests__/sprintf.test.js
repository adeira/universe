// @flow strict

// Important note! We are using here Node.js 'util' to verify it works well and
// it's more or less compatible however, function 'sprintf' is environment
// independent (not only Node.js but also browsers and RN)
import util from 'util';

import { sprintf } from '../index';

test.each([
  ['', 'a  b', 'a "" b'],
  ['string', 'a string b', 'a "string" b'],
  [111, 'a 111 b', 'a 111 b'],
  [
    undefined,
    'a undefined b', // just like when you do `String(undefined)`
    'a undefined b',
  ],
  [null, 'a null b', 'a null b'],
  [NaN, 'a NaN b', 'a null b'],
  [new RegExp(/x/), 'a /x/ b', 'a {} b'],
  [{ aaa: 111 }, 'a [object Object] b', 'a {"aaa":111} b'],
  [{ aaa: 'foo' }, 'a [object Object] b', 'a {"aaa":"foo"} b'],
  [[1, 2], 'a 1,2 b', 'a [1,2] b'],
])(
  '%#) sprintf prints %p correctly for all supported formats',
  (input, outputString, outputJSON) => {
    expect(sprintf('a %s b', input)).toBe(outputString);

    const jsonFormat = 'a %j b';
    expect(sprintf(jsonFormat, input)).toBe(outputJSON);
    expect(sprintf(jsonFormat, input)).toBe(util.format(jsonFormat, input));
  },
);

it('works without placeholder', () => {
  const format = 'aaa bbb ccc';
  expect(sprintf(format)).toBe(format);
  expect(sprintf(format)).toBe(util.format(format));
});

it('ignores unknown placeholders', () => {
  const format = 'aaa %w %t %f ccc';
  expect(sprintf(format)).toBe(format);
  expect(sprintf(format, 42)).toBe(format);
  expect(sprintf(format)).toBe(util.format(format));
});

it('is possible to escape %', () => {
  const format = 'you can use %%s or %%j, percentage: %%';
  expect(sprintf(format)).toBe(format);
  expect(sprintf(format)).toBe(util.format(format));
  expect(sprintf(format, 1, 2)).toBe('you can use %s or %j, percentage: %'); // Node.js would print "you can use %s or %j, percentage: % 1 2" here (vv), fix it?
});

it('leaves placeholders as is when no values provided', () => {
  const format = 'you can use %s or %j';
  expect(sprintf(format)).toBe(format);
  expect(sprintf(format)).toBe(util.format(format));
});

it('replaces only available values', () => {
  const format = 'you can use %s or %j';
  expect(sprintf(format, 1)).toBe('you can use 1 or %j');
  expect(sprintf(format, 1)).toBe(util.format(format, 1));
});

it('escapes and replaces only available values', () => {
  const format = 'you can use %%s or %j';
  expect(sprintf(format, 1)).toBe('you can use %s or 1');
  expect(sprintf(format, 1)).toBe(util.format(format, 1));
});

it('works with String and JSON together', () => {
  const format = 'a %s b %j c';
  expect(sprintf(format, '111', '222')).toBe('a 111 b "222" c');
  expect(sprintf(format, '111', '222')).toBe(util.format(format, '111', '222'));
});

it('JSON format handles circular references', () => {
  const obj = {
    a: 'foo',
  };
  // $FlowExpectedError: Intentional circular reference created
  obj.b = obj;
  expect(sprintf('%j', obj)).toBe('{"a":"foo","b":"[Circular]"}');
});
