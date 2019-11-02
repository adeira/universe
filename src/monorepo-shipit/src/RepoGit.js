// @flow strict-local

import fs from 'fs';
import path from 'path';
import { invariant } from '@adeira/js';
import { ShellCommand } from '@adeira/monorepo-utils';
import logger from '@kiwicom/logger';

import parsePatch from './parsePatch';
import parsePatchHeader from './parsePatchHeader';
import splitHead from './splitHead';
import Changeset from './Changeset';
import accounts from './accounts';

/**
 * This is our monorepo part - source of exports.
 */
export interface SourceRepo {
  findFirstAvailableCommit(): string;
  findDescendantsPath(
    baseRevision: string,
    headRevision: string,
    roots: Set<string>,
  ): null | $ReadOnlyArray<string>;
  getChangesetFromID(revision: string): Changeset;
  getNativePatchFromID(revision: string): string;
  getNativeHeaderFromIDWithPatch(revision: string, patch: string): string;
  getChangesetFromExportedPatch(header: string, patch: string): Changeset;
}

/**
 * Exported repository containing `kiwicom-source-id` handles.
 */
export interface DestinationRepo {
  findLastSourceCommit(roots: Set<string>): null | string;
  renderPatch(changeset: Changeset): string;
  commitPatch(changeset: Changeset): string;
  checkoutBranch(branchName: string): void;
  push(branch: string): void;
}

interface AnyRepo {
  // Will most probably always return '4b825dc642cb6eb9a060e54bf8d69288fbee4904'. What? https://stackoverflow.com/q/9765453/3135248
  getEmptyTreeHash(): string;
}

export default class RepoGit implements AnyRepo, SourceRepo, DestinationRepo {
  #localPath: string;

  constructor(localPath: string) {
    invariant(fs.existsSync(path.join(localPath, '.git')), '%s is not a GIT repo.', localPath);
    this.#localPath = localPath;
  }

  _gitCommand = (...args: $ReadOnlyArray<string>) => {
    return new ShellCommand(this.#localPath, 'git', '--no-pager', ...args).setEnvironmentVariables(
      new Map([
        // https://git-scm.com/docs/git#_environment_variables
        ['GIT_CONFIG_NOSYSTEM', '1'],
        ['GIT_TERMINAL_PROMPT', '0'],
      ]),
    );
  };

  push = (destinationBranch: string) => {
    this._gitCommand('push', 'origin', destinationBranch)
      .setOutputToScreen()
      .runSynchronously();
  };

  configure = () => {
    const username = 'kiwicom-github-bot';
    for (const [key, value] of Object.entries({
      'user.email': accounts.get(username),
      'user.name': username,
    })) {
      // $FlowIssue: https://github.com/facebook/flow/issues/2174
      this._gitCommand('config', key, value)
        .setOutputToScreen()
        .runSynchronously();
    }
  };

  // https://git-scm.com/docs/git-checkout
  checkoutBranch = (branchName: string): void => {
    this._gitCommand(
      'checkout',
      '-B', // create (or switch to) a new branch
      branchName,
    )
      .setOutputToScreen()
      .runSynchronously();
  };

  clean = () => {
    this._gitCommand(
      'clean', // remove untracked files from the working tree
      '-x', // ignore .gitignore
      '-f', // force
      '-f', // double force
      '-d', // remove untracked directories in addition to untracked files
    )
      .setOutputToScreen()
      .runSynchronously();
  };

  isCorrupted = (): boolean => {
    const exitCode = this._gitCommand('fsck', '--strict')
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
    return exitCode !== 0;
  };

  findLastSourceCommit = (roots: Set<string>): null | string => {
    const log = this._gitCommand(
      'log',
      '-1',
      '--grep',
      '^kiwicom-source-id: \\?[a-z0-9]\\+\\s*$',
      ...roots,
    )
      .setNoExceptions() // empty repo fails with: "your current branch 'master' does not have any commits yet"
      .runSynchronously()
      .getStdout()
      .trim();
    const regex = /kiwicom-source-id: ?(?<commit>[a-z0-9]+)$/gm;
    let lastCommit = null;
    let match;
    while ((match = regex.exec(log)) !== null) {
      lastCommit = match?.groups?.commit;
    }
    return lastCommit ?? null;
  };

  // https://stackoverflow.com/a/5189296/3135248
  findFirstAvailableCommit = (): string => {
    // Please note, the following command may return multiple roots. For example,
    // `git` repository has 6 roots (and we should take the last one).
    const rawOutput = this._gitCommand('rev-list', '--max-parents=0', 'HEAD')
      .runSynchronously()
      .getStdout();
    const rootRevisions = rawOutput.trim().split('\n');
    return rootRevisions[rootRevisions.length - 1];
  };

  getNativePatchFromID = (revision: string): string => {
    return this._gitCommand(
      'format-patch',
      '--no-renames',
      '--no-stat',
      '--stdout',
      '--full-index',
      '--format=', // contain nothing but the code changes
      '-1',
      revision,
    )
      .runSynchronously()
      .getStdout();
  };

  getNativeHeaderFromIDWithPatch = (revision: string, patch: string): string => {
    const fullPatch = this._gitCommand(
      'format-patch',
      '--no-renames',
      '--no-stat',
      '--stdout',
      '--full-index',
      '-1',
      revision,
    )
      .runSynchronously()
      .getStdout();
    if (patch.length === 0) {
      // this is an empty commit, so everything is the header
      return fullPatch;
    }
    return fullPatch.replace(patch, '');
  };

  getChangesetFromID = (revision: string): Changeset => {
    logger.log(`Filtering changeset for: ${revision}`);
    const patch = this.getNativePatchFromID(revision);
    const header = this.getNativeHeaderFromIDWithPatch(revision, patch);
    const changeset = this.getChangesetFromExportedPatch(header, patch);
    return changeset.withID(revision);
  };

  getChangesetFromExportedPatch = (header: string, patch: string): Changeset => {
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
    const match = head.match(/^diff --git [ab]\/(?:.*?) [ab]\/(?<path>.*?)$/);
    if (!match) {
      return null;
    }
    const path = match.groups?.path;
    invariant(path != null, 'Cannot parse path from the hunk.');
    return { path, body: tail };
  };

  // TODO: originally `findNextCommit` - pls reconsider
  findDescendantsPath = (
    baseRevision: string,
    headRevision: string,
    roots: Set<string>,
  ): null | $ReadOnlyArray<string> => {
    const log = this._gitCommand(
      'log',
      '--reverse',
      '--ancestry-path',
      '--no-merges',
      '--pretty=tformat:%H',
      `${baseRevision}..${headRevision}`,
      '--', // separates paths from revisions (so you can use non-existent paths)
      ...roots,
    )
      .runSynchronously()
      .getStdout();
    const trimmedLog = log.trim();
    return trimmedLog === '' ? null : trimmedLog.split('\n');
  };

  commitPatch = (changeset: Changeset): string => {
    if (changeset.getDiffs().size === 0) {
      // This is an empty commit, which `git am` does not handle properly.
      this._gitCommand(
        'commit',
        '--allow-empty',
        '--author',
        changeset.getAuthor(),
        '--date',
        changeset.getTimestamp(),
        '--message',
        changeset.getCommitMessage(),
      ).runSynchronously();
    } else {
      const diff = this.renderPatch(changeset);
      try {
        this._gitCommand('am', '--keep-non-patch', '--keep-cr')
          .setStdin(diff)
          .runSynchronously();
      } catch (error) {
        this._gitCommand('am', '--abort')
          .setOutputToScreen()
          .runSynchronously();
        throw error;
      }
    }
    // git rev-parse --verify HEAD
    // git --no-pager log -1 --pretty=format:%H
    return this._gitCommand('rev-parse', '--verify', 'HEAD')
      .runSynchronously()
      .getStdout()
      .trim();
  };

  renderPatch = (changeset: Changeset): string => {
    let renderedDiffs = '';
    const diffs = changeset.getDiffs();
    invariant(diffs.size > 0, 'It is not possible to render empty commit.'); // https://stackoverflow.com/a/34692447

    for (const diff of diffs) {
      const path = diff.path;
      renderedDiffs += `diff --git a/${path} b/${path}\n${diff.body}`;
    }

    // Mon Sep 17 is a magic date used by format-patch to distinguish from real mailboxes
    // see: https://git-scm.com/docs/git-format-patch
    return `From ${changeset.getID()} Mon Sep 17 00:00:00 2001
From: ${changeset.getAuthor()}
Date: ${changeset.getTimestamp()}
Subject: [PATCH] ${changeset.getCommitMessage()}

${renderedDiffs}
--
2.21.0
`;
  };

  /**
   * This function exports specified roots from the monorepo. It takes a
   * snapshot of HEAD revision and exports it to the destination path.
   * Please note: this export is unfiltered.
   */
  export = (exportedRepoPath: string, roots: Set<string>) => {
    const archivePath = path.join(exportedRepoPath, 'archive.tar.gz');
    this._gitCommand(
      'archive',
      '--format=tar',
      `--output=${archivePath}`,
      'HEAD', // TODO
      ...roots,
    )
      .setOutputToScreen()
      .runSynchronously();
    // Previously, we used only STDIN but that didn't work for some binary files like images for some reason.
    // So now we create an actual archive and use this instead.
    return new ShellCommand(exportedRepoPath, 'tar', '-xvf', archivePath)
      .setOutputToScreen()
      .runSynchronously();
  };

  getEmptyTreeHash(): string {
    return this._gitCommand('hash-object', '-t', 'tree', '/dev/null')
      .runSynchronously()
      .getStdout()
      .trim();
  }
}
