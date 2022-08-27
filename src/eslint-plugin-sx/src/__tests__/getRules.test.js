// @flow strict

import path from 'path';

const getRules = require('../getRules');

it('returns all the rules', () => {
  expect(Object.keys(getRules())).toMatchInlineSnapshot(`
    [
      "no-concatenated-classes",
      "no-unused-stylesheet",
      "use-logical-properties",
      "valid-usage",
    ]
  `);
});

it('includes only JS files', () => {
  // rest of the files and directories should be skipped
  expect(Object.keys(getRules(path.join(__dirname, 'fixtures')))).toMatchInlineSnapshot(`
    [
      "ruleA",
      "ruleB",
    ]
  `);
});
