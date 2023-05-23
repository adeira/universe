// @flow strict-local

import fs from 'fs';
import path from 'path';
import { invariant } from '@adeira/js';
import { ShellCommand, ShellCommandResult, type EnvironmentVariables } from '@adeira/shell-command';

import parsePatch from './parsePatch';
import parsePatchHeader from './parsePatchHeader';
import splitHead from './splitHead';
import Changeset, { type Diff } from './Changeset';

/**
 * This is our monorepo part - source of exports.
 */
export interface SourceRepo {
  findFirstAvailableCommit(): string;
  findDescendantsPath(
    baseRevision: string,
    headRevision: string,
    roots: Set<string>,
    includeBaseRevision?: boolean,
  ): null | $ReadOnlyArray<string>;
  getChangesetFromID(revision: string): Changeset;
  getNativePatchFromID(revision: string): string;
  getNativeHeaderFromIDWithPatch(revision: string, patch: string): string;
  getChangesetFromExportedPatch(header: string, patch: string): Changeset;
}

/**
 * Exported repository containing `adeira-source-id` handles.
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

  _gitCommand: (...args: $ReadOnlyArray<string>) => ShellCommand = (...args) => {
    const environmentVariables: EnvironmentVariables = {
      // https://git-scm.com/docs/git#_environment_variables
      GIT_CONFIG_NOSYSTEM: '1',
      GIT_TERMINAL_PROMPT: '0',
    };

    if (process.env.PATH != null) {
      // Since we are overwriting the envs we need to set PATH explicitly in order to access Git
      // from Homebrew in case on macOS (for example).
      environmentVariables.PATH = process.env.PATH;
    }

    return new ShellCommand(this.#localPath, 'git', '--no-pager', ...args).setEnvironmentVariables(
      environmentVariables,
    );
  };

  push: (destinationBranch: string) => void = (destinationBranch) => {
    this._gitCommand('push', 'origin', destinationBranch).runSynchronously();
  };

  configure: () => void = () => {
    for (const [key, value] of Object.entries({
      'user.email': process.env.SHIPIT_COMMITTER_EMAIL,
      'user.name': process.env.SHIPIT_COMMITTER_NAME,
    })) {
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/2174
      this._gitCommand('config', key, value).runSynchronously();
    }
  };

  // https://git-scm.com/docs/git-checkout
  checkoutBranch: (branchName: string) => void = (branchName) => {
    this._gitCommand(
      'checkout',
      '-B', // create (or switch to) a new branch
      branchName,
    ).runSynchronously();
  };

  clean: () => void = () => {
    this._gitCommand(
      'clean', // remove untracked files from the working tree
      '-x', // ignore .gitignore
      '-f', // force
      '-f', // double force
      '-d', // remove untracked directories in addition to untracked files
    ).runSynchronously();
  };

  isCorrupted: () => boolean = () => {
    const exitCode = this._gitCommand('fsck', '--strict')
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
    return exitCode !== 0;
  };

  findLastSourceCommit: (roots: Set<string>) => null | string = (roots) => {
    const log = this._gitCommand(
      'log',
      '-1',
      '--grep',
      '^adeira-source-id: \\?[a-z0-9]\\+\\s*$',
      ...roots,
    )
      .setNoExceptions() // empty repo fails with: "your current branch 'master' does not have any commits yet"
      .runSynchronously()
      .getStdout()
      .trim();
    const regex = /adeira-source-id: ?(?<commit>[a-z0-9]+)$/gm;
    let lastCommit = null;
    let match;
    while ((match = regex.exec(log)) !== null) {
      lastCommit = match?.groups?.commit;
    }
    return lastCommit ?? null;
  };

  // https://stackoverflow.com/a/5189296/3135248
  findFirstAvailableCommit: () => string = () => {
    // Please note, the following command may return multiple roots. For example,
    // `git` repository has 6 roots (and we should take the last one).
    const rawOutput = this._gitCommand('rev-list', '--max-parents=0', 'HEAD')
      .runSynchronously()
      .getStdout();
    const rootRevisions = rawOutput.trim().split('\n');
    return rootRevisions[rootRevisions.length - 1];
  };

  getNativePatchFromID: (revision: string) => string = (revision) => {
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

  getNativeHeaderFromIDWithPatch: (revision: string, patch: string) => string = (
    revision,
    patch,
  ) => {
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

  getChangesetFromID: (revision: string) => Changeset = (revision) => {
    const patch = this.getNativePatchFromID(revision);
    const header = this.getNativeHeaderFromIDWithPatch(revision, patch);
    const changeset = this.getChangesetFromExportedPatch(header, patch);
    return changeset.withID(revision);
  };

  getChangesetFromExportedPatch: (header: string, patch: string) => Changeset = (header, patch) => {
    const changeset = parsePatchHeader(header);
    const diffs = new Set<Diff>();
    for (const hunk of parsePatch(patch)) {
      const diff = this.parseDiffHunk(hunk);
      if (diff !== null) {
        diffs.add(diff);
      }
    }
    return changeset.withDiffs(diffs);
  };

  parseDiffHunk: (hunk: string) => null | { +body: string, +path: string } = (hunk) => {
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
  findDescendantsPath: (
    baseRevision: string,
    headRevision: string,
    roots: Set<string>,
    includeBaseRevision?: boolean,
  ) => null | $ReadOnlyArray<string> = (baseRevision, headRevision, roots, includeBaseRevision) => {
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
    if (trimmedLog === '') {
      return null;
    }

    const descendants = trimmedLog.split('\n');

    if (includeBaseRevision === true) {
      descendants.unshift(baseRevision);
    }

    return descendants;
  };

  commitPatch: (changeset: Changeset) => string = (changeset) => {
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
        this._gitCommand('am', '--keep-non-patch', '--keep-cr').setStdin(diff).runSynchronously();
      } catch (error) {
        this._gitCommand('am', '--show-current-patch').setOutputToScreen().runSynchronously();
        this._gitCommand('am', '--abort').setOutputToScreen().runSynchronously();
        throw error;
      }
    }
    // git rev-parse --verify HEAD
    // git --no-pager log -1 --pretty=format:%H
    return this._gitCommand('rev-parse', '--verify', 'HEAD').runSynchronously().getStdout().trim();
  };

  /**
   * Renders changeset to be later used with `git am` command.
   */
  renderPatch: (changeset: Changeset) => string = (changeset) => {
    let renderedDiffs = '';
    const diffs = changeset.getDiffs();
    invariant(diffs.size > 0, 'It is not possible to render empty commit.'); // https://stackoverflow.com/a/34692447

    for (const diff of diffs) {
      const path = diff.path;
      renderedDiffs += `diff --git a/${path} b/${path}\n${diff.body}`;
    }

    // Insert a space before patterns that will make `git am` think that a line in the commit
    // message is the start of a patch, which is an artifact of the way `git am` tries to tell
    // where the message ends and the diffs begin. This fix is a hack; a better fix might be to
    // use `git apply` and `git commit` directly instead of `git am`. It's inspired by the same
    // fix in `facebook/fbshipit` code.
    //
    // See: https://git-scm.com/docs/git-am/2.32.0#_discussion
    // See: https://github.com/git/git/blob/ebf3c04b262aa27fbb97f8a0156c2347fecafafb/mailinfo.c#L649-L683
    // See: https://github.com/facebook/fbshipit/blob/bd0df15c3c18a6645da7a765789ab60c5ffc3a45/src/shipit/repo/ShipItRepoGIT.php#L236-L240
    const commitMessage = changeset
      .getCommitMessage()
      .replace(/^(?<patch>diff -|Index: |---(?:\s\S|\s*$))/m, ' $1');

    // Mon Sep 17 is a magic date used by format-patch to distinguish from real mailboxes
    // see: https://git-scm.com/docs/git-format-patch
    return `From ${changeset.getID()} Mon Sep 17 00:00:00 2001
From: ${changeset.getAuthor()}
Date: ${changeset.getTimestamp()}
Subject: [PATCH] ${commitMessage}

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
  export: (exportedRepoPath: string, roots: Set<string>) => ShellCommandResult = (
    exportedRepoPath,
    roots,
  ) => {
    const archivePath = path.join(exportedRepoPath, 'archive.tar.gz');
    this._gitCommand(
      'archive',
      '--format=tar',
      `--output=${archivePath}`,
      'HEAD', // TODO
      ...roots,
    ).runSynchronously();
    // Previously, we used only STDIN but that didn't work for some binary files like images for some reason.
    // So now we create an actual archive and use this instead.
    return new ShellCommand(exportedRepoPath, 'tar', '-xvf', archivePath).runSynchronously();
  };

  getEmptyTreeHash(): string {
    return this._gitCommand('hash-object', '-t', 'tree', '/dev/null')
      .runSynchronously()
      .getStdout()
      .trim();
  }
}
