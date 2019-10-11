// @flow

import os from 'os';
import isCI from 'is-ci';

import Git from './Git';

/**
 * This function tries to determine what changes are relevant at the moment.
 * Relevant changes are unstaged/uncommited files, modified files on the branch
 * from master or changes in the last commit as a fallback. It expects default
 * branch to be master. This is how it works internally:
 *
 * First it executes these commands:
 *
 *     git ls-files --others --exclude-standard               # untracked files
 *       +
 *     git --no-pager diff --name-only HEAD                   # uncommited but staged files
 *       +
 *     git --no-pager diff --name-only origin/master...HEAD   # modified files on the feature branch (3 dots are important)
 *
 * Fallback for master or new branches if no result was returned:
 *
 *     git --no-pager diff --name-only HEAD^ HEAD             # latest commit (doesn't work with only one commit in Git history)
 *
 * For more details: https://git-scm.com/docs/git-diff
 */
export default function getChangedFiles(): $ReadOnlyArray<string> {
  const uncommittedChanges = Git.getUntrackedFiles().concat(Git.getWorktreeChangedFiles());

  // It's OK to run tests on uncommitted changes locally but it's unexpected
  // in CI because it indicates that CI generated something which is not
  // expected (tests runner would be confused and it would try to test
  // the newly generated files).
  if (isCI === true && uncommittedChanges.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `ERROR: There are some uncommitted changes in the working tree:

${uncommittedChanges.join(os.EOL)}

This usually means that CI generated some changes (for example during installation of dependencies) which is unexpected. Please try to fix it locally and commit the newly generated files. Git Diff:

${Git.getWorktreeChanges()}`,
    );
    process.exit(1);
  }

  const allChanges = uncommittedChanges.concat(Git.getChangedFiles());
  return allChanges.length > 0 ? allChanges : Git.getLastCommitChanges();
}
