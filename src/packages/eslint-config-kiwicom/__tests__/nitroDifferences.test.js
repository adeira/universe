// @flow

import { diff } from 'deep-diff';

import deprecatedRules from './deprecatedRules';

const CLIEngine = require('eslint').CLIEngine;

expect.addSnapshotSerializer({
  print(serializerValue) {
    return serializerValue;
  },
  test() {
    return true;
  },
});

/**
 * N - indicates a newly added property/element
 * D - indicates a property/element was deleted
 * E - indicates a property/element was edited
 * A - indicates a change occurred within an array
 *
 * See: https://github.com/flitbit/diff#differences
 */
test('differences with @kiwicom/eslint-config-nitro config', () => {
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
});

function formatChanges(description, changes) {
  let differences = `\n${description}\n\n`;
  changes.forEach(change => {
    const { kind } = change;
    let context = '';
    if (kind === 'E') {
      context += `(${JSON.stringify(change.lhs)} -> ${JSON.stringify(
        change.rhs,
      )})`;
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
  return config[0] === 'off' ? 'off' : config;
}

function normalize(config) {
  return Object.entries(config).reduce((acc, [ruleName, value]) => {
    if (Array.isArray(value)) {
      const [level, ...config] = value;
      acc[ruleName] = normalizeArrayConfig([normalizeLevel(level), ...config]);
    } else if (!deprecatedRules.has(ruleName)) {
      // add only rules which are not deprecated
      acc[ruleName] = normalizeLevel(value);
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
