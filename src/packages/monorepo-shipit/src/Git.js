// @flow

import { ChildProcess } from '@kiwicom/monorepo';

import parsePatch from './parsePatch';
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

  getChangesetFromID = (revision: string): Changeset => {
    const patch = this.getNativePatchFromID(revision);
    const diffs = new Set();
    for (const hunk of parsePatch(patch)) {
      const diff = this.parseDiffHunk(hunk);
      if (diff !== null) {
        diffs.add(diff);
      }
    }
    return new Changeset(
      revision,
      diffs,
      'TODO:message', // TODO (parseHeader)
    );
  };

  parseDiffHunk = (hunk: string) => {
    const [head, ...body] = hunk.split('\n');
    const match = head.match(/^diff --git [ab]\/(.*?) [ab]\/(.*?)$/);
    if (!match) {
      return null;
    }
    return {
      path: match[2],
      body: body.join('\n'),
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
