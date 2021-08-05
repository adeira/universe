// @flow

import snapshotDiff from 'snapshot-diff';

const eslintRules: Set<string> = new Set();
beforeAll(() => {
  Object.keys(require('@next/eslint-plugin-next').rules).forEach((rule) => {
    eslintRules.add(`@next/next/${rule}`);
  });
});

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

test('our rules should contain every Eslint rule to be explicit', () => {
  const ourRules = new Map(Object.entries(require('../next').rules));
  const missing = new Set();

  eslintRules.forEach((rule) => {
    if (!ourRules.has(rule)) {
      missing.add(rule);
    }
  });

  expect(missing).toEqual(new Set());
});
