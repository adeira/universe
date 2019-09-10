// @flow

import { diff } from 'deep-diff';

import deprecatedRules from './deprecatedRules';
import extraPrettierRules from '../extraPrettierRules';

const CLIEngine = require('eslint').CLIEngine;

expect.addSnapshotSerializer({
  print(serializerValue) {
    return serializerValue;
  },
  test() {
    return true;
  },
});

const explainedDifferencies = new Set([
  // Rules 'no-unused-expressions' and 'babel/no-unused-expressions' are broken and
  // replaced by 'flow/no-unused-expressions' (it supports not only optional chaining
  // but also exhaustive type checking).
  'no-unused-expressions',

  // This rule is outdated and doesn't sort Flow types correctly (as we like).
  // See: https://gitlab.skypicker.com/incubator/universe/commit/b1d0be4c7b4bfb6fa3557694f7cfcf0bfde05dfb
  // See: https://github.com/airbnb/javascript/blob/4539dbcf17b960ab650665bc95421dc8d0d3276e/packages/eslint-config-airbnb/rules/react.js#L241
  'react/sort-comp',
]);

/**
 * N - indicates a newly added property/element
 * D - indicates a property/element was deleted
 * E - indicates a property/element was edited
 * A - indicates a change occurred within an array
 *
 * See: https://github.com/flitbit/diff#differences
 */
test('differences with @kiwicom/eslint-config-nitro config', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  expect(
    formatChanges(
      'This changelog describes what should Universe change in order to be identical with Nitro config:',
      diff(getRules('../strict'), getRules('@kiwicom/eslint-config-nitro')),
    ),
  ).toMatchSnapshot();

  // This reversed changed is not just naively changed direction of changes.
  // For example, some rules should be added in one direction but NOT removed
  // in the other direction (deletions are not reflected at all).
  expect(
    formatChanges(
      'This changelog describes what should Nitro change in order to be identical with Universe config:',
      diff(getRules('@kiwicom/eslint-config-nitro'), getRules('../strict')),
    ),
  ).toMatchSnapshot();

  expect(consoleSpy.mock.calls).toEqual([
    ["! Nitro Eslint config is deprecated. Use '@kiwicom/eslint-config/nitro' instead."],
  ]);
  consoleSpy.mockRestore();
});

function formatChanges(description, changes) {
  let differences = `\n${description}\n\n`;
  changes.forEach(change => {
    const { kind } = change;
    let context = '';
    if (kind === 'E') {
      context += `(${JSON.stringify(change.lhs)} -> ${JSON.stringify(change.rhs)})`;
    } else if (kind === 'A') {
      context += `(${JSON.stringify(change.item)})`;
    } else if (kind === 'N') {
      context += `(${JSON.stringify(change.rhs)})`;
    }
    if (kind !== 'D') {
      // We do not add DELETED rules into final diff snapshot. This means that we
      // have some additional rules Nitro doesn't contain and there is nothing
      // to do from our side (Nitro should add them?).
      differences += `${kind} - ${change.path} ${context}\n`;
    }
  });
  return differences;
}

function normalizeLevel(level) {
  if (level === 2) {
    return 'error';
  } else if (level === 1) {
    return 'warn';
  } else if (level === 0) {
    return 'off';
  }
  return level;
}

function normalizeArrayConfig(config) {
  // "off" rule is disabled no matter what is the config (so we remove the config)
  const arrayConfig = config[0] === 'off' ? 'off' : config;
  return arrayConfig.length === 1 ? arrayConfig[0] : arrayConfig;
}

function normalize(config) {
  return Object.entries(config).reduce((acc, [ruleName, value]) => {
    let normalizedConfig;
    if (Array.isArray(value)) {
      const [level, ...config] = value;
      normalizedConfig = normalizeArrayConfig([normalizeLevel(level), ...config]);
    } else {
      normalizedConfig = normalizeLevel(value);
    }
    if (
      !deprecatedRules.has(ruleName) &&
      !explainedDifferencies.has(ruleName) &&
      !(ruleName in extraPrettierRules)
    ) {
      // Add only rules which are not deprecated or excluded from the diff.
      // We also skip rules conflicting with prettier (they should always be disabled).
      acc[ruleName] = normalizedConfig;
    }
    return acc;
  }, {});
}

function getRules(dependency) {
  // $FlowAllowDynamicImport
  const dependencyFile = require(dependency);
  const dependencyConfig = new CLIEngine({
    useEslintrc: false,
    rules: dependencyFile.rules,
    baseConfig: {
      extends: dependencyFile.extends,
    },
  }).getConfigForFile(__filename);
  return normalize(dependencyConfig.rules);
}
