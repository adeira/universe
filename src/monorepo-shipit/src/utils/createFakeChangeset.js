// @flow strict

import Changeset from '../Changeset';

/**
 * This changeset contains valid but fake data and should be used only in tests.
 */
export default function createFakeChangeset(
  numberOfDiffs: number = 2,
  basePath: string = '',
): Changeset {
  const diffs = new Set();

  for (let i = 1; i <= numberOfDiffs; i++) {
    const filename = `${basePath}fakeFile_${i}.txt`;
    diffs.add({
      path: filename,
      body:
        'new file mode 100644\n' +
        'index 0000000000000000000000000000000000000000..72943a16fb2c8f38f9dde202b7a70ccc19c52f34\n' +
        '--- /dev/null\n' +
        `+++ b/${filename}\n` +
        '@@ -0,0 +1 @@\n' +
        `+fake content ${i}`,
    });
  }

  return new Changeset()
    .withSubject('Test subject')
    .withDescription('Test description')
    .withAuthor('John Doe <john@doe.com>')
    .withTimestamp('Mon, 16 July 2019 10:55:04 -0100')
    .withDiffs(diffs);
}
