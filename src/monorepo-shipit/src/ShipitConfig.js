// @flow strict

import os from 'os';
import fs from 'fs';
import path from 'path';
import { warning } from '@adeira/js';

import Changeset from './Changeset';
import addTrackingData from './filters/addTrackingData';
import { commentLines, uncommentLines } from './filters/conditionalLines';
import moveDirectories from './filters/moveDirectories';
import moveDirectoriesReverse from './filters/moveDirectoriesReverse';
import stripExceptDirectories from './filters/stripExceptDirectories';
import stripPaths from './filters/stripPaths';

type ChangesetFilter = (Changeset) => Changeset;

export default class ShipitConfig {
  sourcePath: string;
  destinationPath: string;
  exportedRepoURL: string; // TODO: what to do with this?
  directoryMapping: Map<string, string>;
  strippedFiles: Set<RegExp>;

  #sourceBranch: string;
  #destinationBranch: string;

  constructor(
    sourcePath: string,
    exportedRepoURL: string,
    directoryMapping: Map<string, string>,
    strippedFiles: Set<RegExp>,
    sourceBranch: string = 'origin/master', // our GitLab CI doesn't have master branch
    destinationBranch: string = 'master',
  ) {
    this.sourcePath = sourcePath;
    // This is currently not configurable. We could (should) eventually keep
    // the temp directory, cache it and just update it.
    this.destinationPath = fs.mkdtempSync(path.join(os.tmpdir(), 'adeira-shipit-'));
    this.exportedRepoURL = exportedRepoURL;
    this.directoryMapping = directoryMapping;
    this.strippedFiles = strippedFiles;
    this.#sourceBranch = sourceBranch;
    this.#destinationBranch = destinationBranch;
  }

  getSourceRoots(): Set<string> {
    const roots = new Set();
    for (const root of this.directoryMapping.keys()) {
      warning(fs.existsSync(root) === true, `Directory mapping uses non-existent root: ${root}`);
      roots.add(root);
    }
    return roots;
  }

  getDestinationRoots(): Set<string> {
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
      const ch2 = stripExceptDirectories(ch1, this.getSourceRoots());
      const ch3 = moveDirectories(ch2, this.directoryMapping);
      const ch4 = stripPaths(ch3, this.strippedFiles);
      const ch5 = stripPaths(
        ch4,
        new Set([
          // These files are being stripped by default. It's currently not configurable.
          /BUILD(?:\.bazel)?$/,
          /WORKSPACE(?:\.bazel)?$/,
        ]),
      );

      // First we comment out lines marked with `@x-shipit-disable`.
      const ch6 = commentLines(ch5, '@x-shipit-disable', '//', null);
      // Then we uncomment lines marked with `@x-shipit-enable`.
      return uncommentLines(ch6, '@x-shipit-enable', '//', null);
    };
  }

  /**
   * Importit reverses the directory mapping and strip some predefined files.
   * It should be in the reversed order from Shipit filters.
   * Please note: there are usually less filters when importing the project (not 1:1 with Shipit).
   */
  getDefaultImportitFilter(): ChangesetFilter {
    return (changeset: Changeset) => {
      // Comment out lines which are only for OSS.
      const ch1 = commentLines(changeset, '@x-shipit-enable', '//', null);
      // Uncomment private code which is disabled in OSS.
      const ch2 = uncommentLines(ch1, '@x-shipit-disable', '//', null);

      const ch3 = stripPaths(ch2, this.strippedFiles);
      return moveDirectoriesReverse(ch3, this.directoryMapping);
    };
  }

  getSourceBranch(): string {
    return this.#sourceBranch;
  }

  getDestinationBranch(): string {
    return this.#destinationBranch;
  }
}
