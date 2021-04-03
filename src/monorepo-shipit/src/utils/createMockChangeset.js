// @flow strict

import Changeset from '../Changeset';
import createMockDiff from './createMockDiff';

/**
 * This changeset contains valid but fake data and should be used only in tests.
 */
export default function createMockChangeset(
  numberOfDiffs: number = 2,
  basePath: string = '',
): Changeset {
  const diffs = new Set();

  for (let i = 1; i <= numberOfDiffs; i++) {
    const filename = `${basePath}fakeFile_${i}.txt`;
    diffs.add(createMockDiff(filename));
  }

  return new Changeset()
    .withID('1234567890')
    .withSubject('Test subject')
    .withDescription('Test description')
    .withAuthor('John Doe <john@doe.com>')
    .withTimestamp('Mon, 16 July 2019 10:55:04 -0100')
    .withDiffs(diffs);
}
