// @flow

// $FlowFixMe[cannot-resolve-module]: cannot resolve module
import { builtinRules } from 'eslint/use-at-your-own-risk'; // eslint-disable-line import/no-unresolved
import snapshotDiff from 'snapshot-diff';
import prettierConfig from 'eslint-config-prettier';

import deprecatedRules from '../src/deprecatedRules';

const eslintRules: Set<string> = new Set(Object.keys(builtinRules));
beforeAll(() => {
  Object.keys(require('../package.json').dependencies)
    .filter(
      (dep) => dep.startsWith('eslint-plugin') && !dep.startsWith('eslint-plugin-fbt'), // FBT is optional and covered in `fbt.test.js`
    )
    .map((dep) => dep.replace('eslint-plugin-', ''))
    .forEach((plugin) => {
      Object.keys(require(`eslint-plugin-${plugin}`).rules).forEach((rule) => {
        eslintRules.add(`${plugin}/${rule}`);
      });
    });
});

let ourRules, missing;
beforeEach(() => {
  const config = require('../index');
  // Include basic rules:
  ourRules = new Map(Object.entries(config.rules));
  // Include rules defined only in overrides as well:
  config.overrides?.forEach((override) => {
    if (override.rules != null) {
      ourRules = new Map([...ourRules, ...Object.entries(override.rules)]);
    }
  });
  missing = new Set();
});

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

test('our rules should contain every Eslint rule to be explicit', () => {
  // add deprecated rules to the Map to simulate that we are using them
  deprecatedRules.forEach((rule) => {
    ourRules.set(rule, true);
  });

  eslintRules.forEach((rule) => {
    if (!ourRules.has(rule)) {
      missing.add(rule);
    }
  });

  expect(missing).toEqual(
    new Set([
      // We ignore this one rule for now. This should be removed once we make it public
      // and remove it from `.eslintrc.js`
      'adeira/sort-imports',
    ]),
  );
});

const prettierRules = prettierConfig.rules;
test.each(Object.entries(prettierRules))(
  'Eslint rule %p should have value: %p (conflict with Prettier)',
  (rule, value) => {
    // These special rules can have a different value, see:
    // https://github.com/prettier/eslint-config-prettier/blob/9444ee0b20f9af3ff364f62d6a9ab967ad673a9d/README.md#special-rules
    const specialRules = new Set(['curly']);
    if (!specialRules.has(rule)) {
      expect(ourRules.get(rule)).toBe(value);
    }
  },
);

// TODO: test for extra rules

test('rules snapshot', () => {
  const stableRules = require('../index');
  const strictRules = require('../strict');

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
      aAnnotation: 'Value for stable rules',
      bAnnotation: 'Value for STRICT rules',
    }),
  ).toMatchSnapshot('diff of stable and strict rules');
});
