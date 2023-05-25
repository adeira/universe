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

it('should return first commit in list', () => {
  const repo = new RepoGitFake();
  const firstCommit = repo.commitPatch(
    new Changeset()
      .withSubject('test subject')
      .withDescription('initial-commit')
      .withAuthor('John Doe <john@doe.com>')
      .withTimestamp('Mon, 4 Feb 2019 13:29:04 -0600'),
  );

  const secondCommit = repo.commitPatch(
    new Changeset()
      .withSubject('test subject')
      .withDescription('second-commit')
      .withAuthor('John Doe <john@doe.com>')
      .withTimestamp('Mon, 5 Feb 2019 13:29:04 -0600'),
  );

  const descendants = repo.findDescendantsPath(firstCommit, 'master', new Set([]));

  // It never brings back the first commit (base revision)!
  // This means any repository that has a first commit _with content_ has its shipit fail.
  expect(descendants).toEqual([secondCommit]);

  const descendantsFromFirst = repo.findDescendantsPath(firstCommit, 'master', new Set([]), true);

  // By forcing it we can have it picked up.
  expect(descendantsFromFirst).toEqual([firstCommit, secondCommit]);
});
