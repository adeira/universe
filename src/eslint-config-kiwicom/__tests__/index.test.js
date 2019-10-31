// @flow

import snapshotDiff from 'snapshot-diff';
import prettierConfig from 'eslint-config-prettier';

import deprecatedRules from './deprecatedRules';
import eslintRules from './eslintRules';

let ourRules, missing;
beforeEach(() => {
  ourRules = new Map(Object.entries(require('../index.js').rules));
  missing = new Set();
});

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

test('our rules should contain every Eslint rule to be explicit', () => {
  // add deprecated rules to the Map to simulate that we are using them
  deprecatedRules.forEach(rule => {
    ourRules.set(rule, true);
  });

  eslintRules.forEach(rule => {
    if (!ourRules.has(rule)) {
      missing.add(rule);
    }
  });

  expect(missing).toEqual(new Set());
});

test('our rules does not contain "overrides" keyword', () => {
  // This could potentially overwrite Prettier rules but I believe we can just
  // disallow this keyword here since it would be very unusual to use it.

  function getOverrides(config) {
    // $FlowExpectedError: overrides key is missing which is exactly what we want
    return config.overrides;
  }

  expect(getOverrides(require('../index.js'))).toBeUndefined();

  // Just to be sure our `getOverrides` function is OK:
  expect(
    getOverrides({
      rules: {},
      overrides: [],
    }),
  ).toEqual([]);
});

const prettierRules = prettierConfig.rules;
test.each(Object.entries(prettierRules))(
  'Eslint rule %p should have value: %p (conflict with Prettier)',
  (rule, value) => expect(ourRules.get(rule)).toBe(value),
);

// TODO: test for extra rules

test('rules snapshot', () => {
  const stableRules = require('../index.js');
  const strictRules = require('../strict.js');

  expect(stableRules).toMatchSnapshot(
    {
      settings: {
        react: {
          version: expect.any(String),
        },
      },
    },
    'all stable rules',
  );

  expect(
    snapshotDiff(stableRules, strictRules, {
      contextLines: 1,
      stablePatchmarks: true,
    }),
  ).toMatchSnapshot('diff of stable and strict rules');
});
