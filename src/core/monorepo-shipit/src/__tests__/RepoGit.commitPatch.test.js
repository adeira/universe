// @flow

import RepoGitFake from '../RepoGitFake';
import Changeset from '../Changeset';

it('can commit empty changeset', () => {
  const repo = new RepoGitFake();
  const changeset = new Changeset()
    .withSubject('My test subject')
    .withDescription('My test description.')
    .withAuthor('John Doe <john@doe.com>')
    .withTimestamp('Mon, 4 Feb 2019 13:29:04 -0600');
  const sha = repo.commitPatch(changeset);
  expect(sha).toBe(repo.findLastSourceCommit(new Set()));
});

it('commits changeset with single diff correctly', () => {
  const repo = new RepoGitFake();
  const changeset = new Changeset()
    .withSubject('My test subject')
    .withDescription('My test description.')
    .withAuthor('John Doe <john@doe.com>')
    .withTimestamp('Mon, 4 Feb 2019 13:29:04 -0600')
    .withDiffs(
      new Set([
        {
          path: 'aaa.txt',
          body:
            'new file mode 100644\n' +
            'index 0000000000000000000000000000000000000000..72943a16fb2c8f38f9dde202b7a70ccc19c52f34\n' +
            '--- /dev/null\n' +
            '+++ b/aaa.txt\n' +
            '@@ -0,0 +1 @@\n' +
            '+aaa',
        },
      ]),
    );
  const sha = repo.commitPatch(changeset);
  expect(sha).toBe(repo.findLastSourceCommit(new Set()));

  const patch = repo.getNativePatchFromID(sha);
  expect(repo.getNativeHeaderFromIDWithPatch(sha, patch)).toMatchInlineSnapshot(`
    "From ${sha} Mon Sep 17 00:00:00 2001
    From: John Doe <john@doe.com>
    Date: Mon, 4 Feb 2019 13:29:04 -0600
    Subject: [PATCH] My test subject

    My test description.

    "
  `);
});

it('commits changeset with multiple diffs correctly', () => {
  const repo = new RepoGitFake();
  const changeset = new Changeset()
    .withSubject('Test subject')
    .withDescription('Test description.')
    .withAuthor('AAA <aaa@example.com>')
    .withTimestamp('Mon, 4 Feb 2019 13:29:04 -0600')
    .withDiffs(
      new Set([
        {
          path: 'aaa.txt',
          body:
            'new file mode 100644\n' +
            'index 0000000000000000000000000000000000000000..72943a16fb2c8f38f9dde202b7a70ccc19c52f34\n' +
            '--- /dev/null\n' +
            '+++ b/aaa.txt\n' +
            '@@ -0,0 +1 @@\n' +
            '+aaa',
        },
        {
          path: 'bbb.txt',
          body:
            'new file mode 100644\n' +
            'index 0000000000000000000000000000000000000000..72943a16fb2c8f38f9dde202b7a70ccc19c52f34\n' +
            '--- /dev/null\n' +
            '+++ b/bbb.txt\n' +
            '@@ -0,0 +1 @@\n' +
            '+bbb',
        },
      ]),
    );
  const sha = repo.commitPatch(changeset);
  expect(sha).toBe(repo.findLastSourceCommit(new Set()));

  const patch = repo.getNativePatchFromID(sha);
  expect(repo.getNativeHeaderFromIDWithPatch(sha, patch)).toMatchInlineSnapshot(`
    "From ${sha} Mon Sep 17 00:00:00 2001
    From: AAA <aaa@example.com>
    Date: Mon, 4 Feb 2019 13:29:04 -0600
    Subject: [PATCH] Test subject

    Test description.

    "
  `);
});
