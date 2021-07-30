// @flow

import refineSupportedCurrencies from '../refineSupportedCurrencies';

it.each`
  input        | expectedOutput
  ${null}      | ${'MXN'}
  ${undefined} | ${'MXN'}
  ${-1}        | ${'MXN'}
  ${[]}        | ${'MXN'}
  ${{}}        | ${'MXN'}
  ${'USD'}     | ${'MXN'}
  ${'MXN'}     | ${'MXN'}
  ${'mxn'}     | ${'MXN'}
`('refines $input correctly to $expectedOutput', ({ input, expectedOutput }) => {
  expect(refineSupportedCurrencies(input)).toBe(expectedOutput);
});
