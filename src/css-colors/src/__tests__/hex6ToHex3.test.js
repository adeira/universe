// @flow strict

import hex6ToHex3 from '../hex6ToHex3';

it('converts full RBG hex to a short form', () => {
  expect(hex6ToHex3('#663399')).toBe('#639');
});
