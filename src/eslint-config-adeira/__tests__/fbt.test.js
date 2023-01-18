// @flow

import snapshotDiff from 'snapshot-diff';

const eslintRules: Set<string> = new Set();
beforeAll(() => {
  Object.keys(require('eslint-plugin-fbt').rules).forEach((rule) => {
    eslintRules.add(`fbt/${rule}`);
  });
});

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

test('our rules should contain every Eslint rule to be explicit', () => {
  const ourRules = new Map<string, $FlowFixMe>(Object.entries(require('../fbt').rules));
  const missing = new Set<string>();

  eslintRules.forEach((rule) => {
    if (!ourRules.has(rule)) {
      missing.add(rule);
    }
  });

  expect(missing).toEqual(new Set());
});
