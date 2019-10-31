// @flow strict

import createQueryID from '../createQueryID';

it('creates query IDs as expected', () => {
  expect(createQueryID('mock query string 1')).toBe('3acd9b99ecc9a7cbb32e5ede51d73190');
  expect(createQueryID('mock query string 2')).toBe('27dc67ed4059fa71dba87dac83ac764c');
});
