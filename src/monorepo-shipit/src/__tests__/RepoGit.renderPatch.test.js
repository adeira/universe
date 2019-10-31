// @flow

import RepoGit from '../RepoGitFake';
import Changeset from '../Changeset';

function createChangeset(diffs) {
  const emptyChangeset = new Changeset()
    .withID('mocked_id')
    .withTimestamp('mocked_timestamp')
    .withAuthor('mocked_author')
    .withSubject('mocked_subject')
    .withDescription('mocked_description');
  if (diffs === null) {
    return emptyChangeset;
  }
  return emptyChangeset.withDiffs(diffs);
}

it('throws when trying to render empty changeset', () => {
  const repo = new RepoGit();
  const changeset = createChangeset(null);
  expect(() => repo.renderPatch(changeset)).toThrowErrorMatchingInlineSnapshot(
    `"It is not possible to render empty commit."`,
  );
});

it('renders patch with one diff as expected', () => {
  const repo = new RepoGit();
  const changeset = createChangeset(new Set([{ path: 'mocked_path', body: 'mocked_body\n' }]));
  expect(repo.renderPatch(changeset)).toMatchSnapshot();
});

it('renders patch with more diffs as expected', () => {
  const repo = new RepoGit();
  const changeset = createChangeset(
    new Set([
      { path: 'mocked_path1', body: 'mocked_body1\n' },
      { path: 'mocked_path2', body: 'mocked_body2\n' },
      { path: 'mocked_path3', body: 'mocked_body3\n' },
    ]),
  );
  expect(repo.renderPatch(changeset)).toMatchSnapshot();
});
