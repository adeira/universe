// @flow

import fs from 'fs';
import path from 'path';

import { commentLines, uncommentLines } from '../conditionalLines';
import RepoGitFake from '../../RepoGitFake';
import Changeset from '../../Changeset';

function printBodies(changeset: Changeset): string {
  return [...changeset.getDiffs()].map(diff => diff.body).toString();
}

function getChangeset(patchName: string): Changeset {
  const repo = new RepoGitFake();
  const patch = fs.readFileSync(path.join(__dirname, 'fixtures', patchName), 'utf8');
  return repo.getChangesetFromExportedPatch('MOCKED', patch);
}

it('comments lines correctly - no comment end', () => {
  const changeset = getChangeset('comment-lines-no-comment-end.patch');
  const newChangeset = commentLines(changeset, '@x-oss-disable', '//', null);
  const revertedChangeset = uncommentLines(newChangeset, '@x-oss-disable', '//', null);

  expect({
    input: printBodies(changeset),
    output: printBodies(newChangeset),
  }).toMatchSnapshot();

  expect(printBodies(revertedChangeset)).toBe(printBodies(changeset));
});

it('comments lines correctly - with comment end', () => {
  const changeset = getChangeset('comment-lines-comment-end.patch');
  const newChangeset = commentLines(changeset, '@x-oss-disable', '/*', '*/');
  const revertedChangeset = uncommentLines(newChangeset, '@x-oss-disable', '/*', '*/');

  expect({
    input: printBodies(changeset),
    output: printBodies(newChangeset),
  }).toMatchSnapshot();

  expect(printBodies(revertedChangeset)).toBe(printBodies(changeset));
});

it('works with comments in comments', () => {
  const changeset = getChangeset('double-comment.patch');
  const newChangeset = commentLines(changeset);
  const revertedChangeset = uncommentLines(newChangeset);

  expect({
    input: printBodies(changeset),
    output: printBodies(newChangeset),
  }).toMatchSnapshot();

  expect(printBodies(revertedChangeset)).toBe(printBodies(changeset));
});

it('enables and disables lines as needed', () => {
  // This is a real-life example where we disable some lines but enable others.

  const changeset = getChangeset('enable-disable.patch');
  const newChangeset = uncommentLines(
    commentLines(changeset, '@x-oss-disable', '//', null),
    '@x-oss-enable',
    '//',
    null,
  );

  expect({
    input: printBodies(changeset),
    output: printBodies(newChangeset),
  }).toMatchSnapshot();
});
