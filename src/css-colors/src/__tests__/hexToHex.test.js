// @flow strict

import hex6ToHex3 from '../hex6ToHex3';
import hex3ToHex6 from '../hex3ToHex6';

it('converts full RBG hex to a short form', () => {
  expect(hex6ToHex3('#663399')).toBe('#639');
});

it('converts short RBG hex to a full form', () => {
  expect(hex3ToHex6('#639')).toBe('#663399');
});
