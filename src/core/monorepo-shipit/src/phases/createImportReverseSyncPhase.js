// @flow strict-local

import { ShellCommand } from '@kiwicom/monorepo-utils';

import accounts from '../accounts';
import RepoGit, { type DestinationRepo } from '../RepoGit';
import Changeset from '../Changeset';
import ShipitConfig from '../ShipitConfig';

export default function createImportReverseSyncPhase(config: ShipitConfig) {
  function getFilteredChangeset(): Changeset {
    const destRepo = new RepoGit(config.destinationPath);
    const emptyTreeHash = destRepo.getEmptyTreeHash();

    const patch = new ShellCommand(
      config.destinationPath,
      'git',
      'diff',
      '--binary',
      emptyTreeHash,
      'HEAD',
    )
      .runSynchronously()
      .getStdout()
      .trim();

    const author = 'kiwicom-github-bot';
    const authorEmail = accounts.get(author) ?? '';
    const changeset = destRepo
      .getChangesetFromExportedPatch(``, patch)
      .withSubject(`Auto-import ${config.exportedRepoURL}`)
      .withAuthor(`${author} <${authorEmail}>`)
      .withTimestamp(new Date().toUTCString());

    const filter = config.getDefaultImportitFilter();
    return filter(changeset);
  }

  return function() {
    const monorepo: DestinationRepo = new RepoGit(config.sourcePath);
    const changeset = getFilteredChangeset();

    monorepo.checkoutBranch('monorepo-importit-github');

    if (changeset.isValid()) {
      monorepo.commitPatch(changeset);
    }
  };
}
