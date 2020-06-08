// @flow

import snapshotDiff from 'snapshot-diff';
import { generateTestsFromFixtures } from '@adeira/test-utils';
import path from 'path';

import modify from '../modifyPackageJSON';

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

generateTestsFromFixtures(path.join(__dirname, 'fixtures'), rawInput => {
  const input = JSON.parse(rawInput);
  const modifiedInput = modify(input);
  const changes = snapshotDiff(input, modifiedInput);
  return `${JSON.stringify(modifiedInput, null, 2)}\n~~~~~\n${changes}`;
});
