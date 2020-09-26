// @flow

import RepoGitFake from '../RepoGitFake';
import createMockChangeset from '../utils/createMockChangeset';

it('can commit empty changeset', () => {
  const repo = new RepoGitFake();
  const changeset = createMockChangeset(0);
  repo.commitPatch(changeset);
  expect(repo.printFakeRepoHistory()).toMatchInlineSnapshot(`
    "SUBJ: Test subject
    DESC: Test description"
  `);
});

it('commits changeset with single diff correctly', () => {
  const repo = new RepoGitFake();
  const changeset = createMockChangeset(1);
  repo.commitPatch(changeset);

  expect(repo.printFakeRepoHistory()).toMatchInlineSnapshot(`
    "SUBJ: Test subject
    DESC: Test description

     fakeFile_1.txt | 1 +
     1 file changed, 1 insertion(+)"
  `);
});

it('commits changeset with multiple diffs correctly', () => {
  const repo = new RepoGitFake();
  const changeset = createMockChangeset(3);
  repo.commitPatch(changeset);

  expect(repo.printFakeRepoHistory()).toMatchInlineSnapshot(`
    "SUBJ: Test subject
    DESC: Test description

     fakeFile_1.txt | 1 +
     fakeFile_2.txt | 1 +
     fakeFile_3.txt | 1 +
     3 files changed, 3 insertions(+)"
  `);
});
