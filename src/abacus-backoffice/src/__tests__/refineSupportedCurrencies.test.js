// @flow

import refineSupportedCurrencies from '../refineSupportedCurrencies';

it.each`
  input        | expectedOutput
  ${null}      | ${'MXN'}
  ${undefined} | ${'MXN'}
  ${-1}        | ${'MXN'}
  ${[]}        | ${'MXN'}
  ${{}}        | ${'MXN'}
  ${'MXN'}     | ${'MXN'}
  ${'mxn'}     | ${'MXN'}
  ${'USD'}     | ${'USD'}
`('refines $input correctly to $expectedOutput', ({ input, expectedOutput }) => {
  expect(refineSupportedCurrencies(input)).toBe(expectedOutput);
});
