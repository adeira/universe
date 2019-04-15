// @flow

import fs from 'fs';
import path from 'path';
import os from 'os';

import Changeset from './Changeset';
import PathFilters from './PathFilters';

type ChangesetFilter = Changeset => Changeset;

export default class PhaseRunnerConfig {
  monorepoPath: string;
  exportedRepoPath: string;
  exportedRepoURL: string;
  directoryMapping: Map<string, string>;

  constructor(
    monorepoPath: string,
    exportedRepoURL: string,
    directoryMapping: Map<string, string>,
  ) {
    this.monorepoPath = monorepoPath;
    // This is currently not configurable. We could (should) eventually keep
    // the temp directory, cache it and just update it.
    this.exportedRepoPath = fs.mkdtempSync(
      path.join(os.tmpdir(), 'kiwicom-shipit-'),
    );
    this.exportedRepoURL = exportedRepoURL;
    this.directoryMapping = directoryMapping;
  }

  getMonorepoRoots(): Set<string> {
    return new Set(this.directoryMapping.keys());
  }

  getExportedRepoRoots(): Set<string> {
    return new Set(this.directoryMapping.values());
  }

  getDefaultShipitFilter(): ChangesetFilter {
    return (changeset: Changeset) => {
      return PathFilters.moveDirectories(
        PathFilters.stripExceptDirectories(changeset, this.getMonorepoRoots()),
        this.directoryMapping,
      );
    };
  }

  getDefaultImportitFilter(): ChangesetFilter {
    return (changeset: Changeset) => {
      return PathFilters.moveDirectoriesReverse(
        changeset,
        this.directoryMapping,
      );
    };
  }
}
