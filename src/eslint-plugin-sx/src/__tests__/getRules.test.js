// @flow strict

const getRules = require('../getRules');

it('returns all the rules', () => {
  expect(Object.keys(getRules())).toMatchInlineSnapshot(`
    Array [
      "no-concatenated-classes",
      "no-unused-stylesheet",
      "valid-usage",
    ]
  `);
});
