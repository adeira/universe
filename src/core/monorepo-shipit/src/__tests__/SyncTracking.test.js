// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import { ShellCommand } from '@kiwicom/monorepo-utils';

import Changeset from '../Changeset';
import RepoGIT from '../RepoGIT';
import addTrackingData from '../filters/addTrackingData';

/**
 * This function returns newly created and ready to go repository for our
 * integration tests. We could eventually extract it somewhere.
 */
function createGITRepo(): string {
  const testRepoPath = fs.mkdtempSync(path.join(os.tmpdir(), 'kiwicom-shipit-tests-'));
  new ShellCommand(testRepoPath, 'git', 'init').runSynchronously();
  for (const [key, value] of Object.entries({
    'user.email': 'shipit-tests@kiwi.com',
    'user.name': 'kiwicom-shipit-tests',
  })) {
    new ShellCommand(
      testRepoPath,
      'git',
      'config',
      key,
      // $FlowIssue: https://github.com/facebook/flow/issues/2174
      value,
    ).runSynchronously();
  }
  return testRepoPath;
}

function createGITRepoWithCommit(message) {
  const testRepoPath = createGITRepo();
  new ShellCommand(
    testRepoPath,
    'git',
    'commit',
    '--cleanup=verbatim',
    '--allow-empty',
    '--message',
    message,
  ).runSynchronously();
  return new RepoGIT(testRepoPath);
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
  const description = `kiwicom-source-id:${fakeCommitID}`;
  const repo = createGITRepoWithCommit(`${description}  `);
  expect(repo.findLastSourceCommit(new Set())).toBe(fakeCommitID);
});
