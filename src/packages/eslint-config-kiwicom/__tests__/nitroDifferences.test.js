// @flow

import { diff } from 'deep-diff';

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
  const changes = diff(
    getRules('../strict'),
    getRules('@kiwicom/eslint-config-nitro'),
  );

  let differences = '';
  changes.forEach(change => {
    const { kind } = change;
    let context = '';
    if (kind === 'E') {
      context += `(${JSON.stringify(change.lhs)} vs. ${JSON.stringify(
        change.rhs,
      )})`;
    } else if (kind === 'A') {
      context += `(${JSON.stringify(change.item)})`;
    }
    if (kind !== 'D') {
      // We do not add DELETED rules into final diff snapshot. This means that we
      // have some additional rules Nitro doesn't contain and there is nothing
      // to do from our side (Nitro should add them?).
      differences += `${kind} - ${change.path} ${context}\n`;
    }
  });

  expect(differences).toMatchSnapshot();
});

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
  return config[0] === 'off' ? 'off' : config;
}

function normalize(config) {
  return Object.entries(config).reduce((acc, [ruleName, value]) => {
    if (Array.isArray(value)) {
      const [level, ...config] = value;
      acc[ruleName] = normalizeArrayConfig([normalizeLevel(level), ...config]);
    } else {
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
