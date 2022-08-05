// @flow

import Changeset from '../Changeset';
import RepoGitFake from '../RepoGitFake';
import addTrackingData from '../filters/addTrackingData';

function createGITRepoWithCommit(message: string) {
  const repo = new RepoGitFake();
  repo.commitPatch(
    new Changeset()
      .withSubject('test subject')
      .withDescription(message)
      .withAuthor('John Doe <john@doe.com>')
      .withTimestamp('Mon, 4 Feb 2019 13:29:04 -0600'),
  );
  return repo;
}

function generateCommitID() {
  const randomInt1 = Math.floor(Math.random() * 1000);
  const randomInt2 = Math.floor(Math.random() * 1000);
  return `${randomInt1}abcdef012345${randomInt2}`; // must be [a-z0-9]+
}

it('can find last source commit', () => {
  const fakeCommitID = generateCommitID();
  const description = addTrackingData(new Changeset().withID(fakeCommitID)).getDescription();
  const repo = createGITRepoWithCommit(description);
  expect(repo.findLastSourceCommit(new Set())).toBe(fakeCommitID);
});

it('can find last source commit with Co-authored-by', () => {
  const fakeCommitID = generateCommitID();
  const description = addTrackingData(
    new Changeset()
      .withID(fakeCommitID)
      .withCoAuthorLines(['Co-authored-by: Trond Bergquist <trond_bergquist@hotmail.com>']),
  ).getDescription();
  const repo = createGITRepoWithCommit(description);
  expect(repo.findLastSourceCommit(new Set())).toBe(fakeCommitID);
});

it('can find last source commit with multiple markers', () => {
  const fakeCommitID1 = generateCommitID();
  const fakeCommitID2 = generateCommitID();
  const description1 = addTrackingData(new Changeset().withID(fakeCommitID1)).getDescription();
  const description2 = addTrackingData(new Changeset().withID(fakeCommitID2)).getDescription();
  const repo = createGITRepoWithCommit(`${description1}\n\n${description2}`);
  expect(repo.findLastSourceCommit(new Set())).toBe(fakeCommitID2);
});

it('can find last source commit with trailing whitespace', () => {
  const fakeCommitID = generateCommitID();
  const description = addTrackingData(new Changeset().withID(fakeCommitID)).getDescription();
  const repo = createGITRepoWithCommit(`${description}  `);
  expect(repo.findLastSourceCommit(new Set())).toBe(fakeCommitID);
});

it('can find last source commit without whitespaces', () => {
  const fakeCommitID = generateCommitID();
  const description = `adeira-source-id:${fakeCommitID}`;
  const repo = createGITRepoWithCommit(`${description}  `);
  expect(repo.findLastSourceCommit(new Set())).toBe(fakeCommitID);
});
