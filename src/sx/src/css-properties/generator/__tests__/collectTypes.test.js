// @flow

import collectTypes from '../collectTypes';
import { FLOW_TYPE_NUMBER, FLOW_TYPE_STRING } from '../flowTypes';

it('works with keywords and groups', () => {
  expect(collectTypes('true | false')).toEqual(new Set(['true', 'false']));
});

it('handles special types correctly', () => {
  expect(collectTypes('<integer>')).toEqual(new Set([FLOW_TYPE_NUMBER]));
  expect(collectTypes('<number>')).toEqual(new Set([FLOW_TYPE_NUMBER]));
  expect(collectTypes('<percentage>')).toEqual(new Set([FLOW_TYPE_STRING]));
  expect(collectTypes('<length-percentage>')).toEqual(
    new Set([FLOW_TYPE_NUMBER, FLOW_TYPE_STRING]),
  );
});

it('handles simple multipliers correctly', () => {
  expect(collectTypes('<number>')).toEqual(new Set([FLOW_TYPE_NUMBER]));
  expect(collectTypes('<number>#')).toEqual(new Set([FLOW_TYPE_NUMBER, FLOW_TYPE_STRING]));
});

it('panics for more complex syntaxes', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
  const result = collectTypes('<number-percentage>{1,4} && fill?');
  expect(result).toBeNull();
  expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "❌ PANIC (unsupported Group): <number-percentage>{1,4} && fill?",
      ],
    ]
  `);
  consoleSpy.mockRestore();
});
