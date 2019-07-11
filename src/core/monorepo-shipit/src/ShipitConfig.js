// @flow strict

import os from 'os';
import fs from 'fs';
import path from 'path';
import { warning } from '@kiwicom/js';

import Changeset from './Changeset';
import addTrackingData from './filters/addTrackingData';
import moveDirectories from './filters/moveDirectories';
import moveDirectoriesReverse from './filters/moveDirectoriesReverse';
import stripExceptDirectories from './filters/stripExceptDirectories';
import stripPaths from './filters/stripPaths';

type ChangesetFilter = Changeset => Changeset;

export default class ShipitConfig {
  sourcePath: string;
  destinationPath: string;
  exportedRepoURL: string;
  directoryMapping: Map<string, string>;
  strippedFiles: Set<RegExp>;

  constructor(
    monorepoPath: string,
    exportedRepoURL: string,
    directoryMapping: Map<string, string>,
    strippedFiles: Set<RegExp>,
  ) {
    this.sourcePath = monorepoPath;
    // This is currently not configurable. We could (should) eventually keep
    // the temp directory, cache it and just update it.
    this.destinationPath = fs.mkdtempSync(path.join(os.tmpdir(), 'kiwicom-shipit-'));
    this.exportedRepoURL = exportedRepoURL;
    this.directoryMapping = directoryMapping;
    this.strippedFiles = strippedFiles;
  }

  getMonorepoRoots(): Set<string> {
    const roots = new Set();
    for (const root of this.directoryMapping.keys()) {
      warning(fs.existsSync(root) === true, `Directory mapping uses non-existent root: ${root}`);
      roots.add(root);
    }
    return roots;
  }

  getExportedRepoRoots(): Set<string> {
    // In out cases root is always "". However, if we'd like to export our
    // workspaces to another monorepo then the root would change to something
    // like "my-oss-project/"
    return new Set();
  }

  /**
   * Shipit by default maps directory to match OSS version and strips everything
   * else so we don't publish something outside of the roots scope.
   */
  getDefaultShipitFilter(): ChangesetFilter {
    return (changeset: Changeset) => {
      const ch1 = addTrackingData(changeset);
      const ch2 = stripExceptDirectories(ch1, this.getMonorepoRoots());
      const ch3 = moveDirectories(ch2, this.directoryMapping);
      return stripPaths(ch3, this.strippedFiles);
    };
  }

  /**
   * Importit only needs to reverse the directory mapping.
   */
  getDefaultImportitFilter(): ChangesetFilter {
    return (changeset: Changeset) => {
      return moveDirectoriesReverse(changeset, this.directoryMapping);
    };
  }
}
