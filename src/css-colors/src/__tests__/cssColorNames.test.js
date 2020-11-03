// @flow strict

import cssColorNames from '../cssColorNames';

it('returns a map of all colors', () => {
  expect(cssColorNames.get('rebeccapurple')).toBe('#663399');
});
