// @flow strict-local

import { ChildProcess } from '@kiwicom/monorepo';

import parsePatch from './parsePatch';
import parsePatchHeader from './parsePatchHeader';
import splitHead from './splitHead';
import Changeset from './Changeset';

function git(args: $ReadOnlyArray<string>) {
  return ChildProcess.executeSystemCommand('git', ['--no-pager', ...args]);
}

export default class Git {
  getNativePatchFromID = (revision: string): string => {
    return git([
      'format-patch',
      '--no-renames',
      '--no-stat',
      '--stdout',
      '--full-index',
      '--format=', // contain nothing but the code changes
      '-1',
      revision,
    ]);
  };

  getNativeHeaderFromIDWithPatch = (
    revision: string,
    patch: string,
  ): string => {
    const fullPatch = git([
      'format-patch',
      '--no-renames',
      '--no-stat',
      '--stdout',
      '--full-index',
      '-1',
      revision,
    ]);
    if (patch.length === 0) {
      // this is an empty commit, so everything is the header
      return fullPatch;
    }
    return fullPatch.replace(patch, '');
  };

  getChangesetFromID = (revision: string): Changeset => {
    const patch = this.getNativePatchFromID(revision);
    const header = this.getNativeHeaderFromIDWithPatch(revision, patch);
    const changeset = this.getChangesetFromExportedPatch(header, patch);
    return changeset.withID(revision);
  };

  getChangesetFromExportedPatch = (header: string, patch: string) => {
    const changeset = parsePatchHeader(header);
    const diffs = new Set();
    for (const hunk of parsePatch(patch)) {
      const diff = this.parseDiffHunk(hunk);
      if (diff !== null) {
        diffs.add(diff);
      }
    }
    return changeset.withDiffs(diffs);
  };

  parseDiffHunk = (hunk: string) => {
    const [head, tail] = splitHead(hunk, '\n');
    const match = head.match(/^diff --git [ab]\/(.*?) [ab]\/(.*?)$/);
    if (!match) {
      return null;
    }
    return {
      path: match[2],
      body: tail,
    };
  };

  findDescendantsPath = (
    revision: string,
    roots: $ReadOnlyArray<string>,
  ): $ReadOnlyArray<string> => {
    const log = git([
      'log',
      '--reverse',
      '--ancestry-path',
      '--no-merges',
      '--pretty=tformat:%H',
      revision + '..master',
      ...roots,
    ]);

    // return descendant hashes
    return log.trim().split('\n');
  };
}
