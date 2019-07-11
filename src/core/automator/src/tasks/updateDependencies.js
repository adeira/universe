// @flow

import fs from 'fs';
import semver from 'semver';
import { ShellCommand, Workspaces, findRootPackageJsonPath } from '@kiwicom/monorepo-utils';
import { sprintf } from '@kiwicom/js';

import automatorLog from '../log';
import commitAllAndOpenMR from '../helpers/gitlab/commitAllAndOpenMR';

export default function run(taskIdentifier: string) {
  updateDependencies(taskIdentifier, async () => {
    await commitAllAndOpenMR(taskIdentifier, 'Monorepo: upgrade dependencies');
  });
}

function updateDependencies(taskIdentifier: string, cb: () => Promise<void>) {
  function log(message, ...params) {
    automatorLog(taskIdentifier, sprintf(message, ...params));
  }

  function bumpDependency(dependency, packageJSON, packageJSONLocation) {
    const requiredVersion = packageJSON[dependency.packageType][dependency.packageName];
    const newVersion = `^${dependency.versionLatest}`;
    const workspaceName = dependency.workspaceName || '"/"'; // can be ""

    // skip exotic dependencies
    if (dependency.versionLatest === 'exotic') {
      return log(
        '⚠️ Skipping exotic dependency: %s (in %s) %s',
        dependency.packageName,
        workspaceName,
        requiredVersion,
      );
    }

    // skip breaking major changes
    if (semver.diff(dependency.versionCurrent, dependency.versionLatest) === 'major') {
      return log(
        '⚠️ Skipping major breaking change: %s (in %s) %s -> %s',
        dependency.packageName,
        workspaceName,
        requiredVersion,
        newVersion,
      );
    }

    // skip exact (locked) versions
    if (semver.validRange(requiredVersion) === requiredVersion) {
      return log(
        '⚠️ Skipping exact (locked) dependency: %s %s (in %s)',
        dependency.packageName,
        requiredVersion,
        workspaceName,
      );
    }

    log(
      '✅ Bumping: %s (in %s) %s -> %s',
      dependency.packageName,
      workspaceName,
      requiredVersion,
      newVersion,
    );

    // overwrite current version
    packageJSON[dependency.packageType][dependency.packageName] = newVersion;
    fs.writeFileSync(packageJSONLocation, `${JSON.stringify(packageJSON, null, 2)}\n`);

    return undefined;
  }

  // Returns JSON lines: http://jsonlines.org/
  const data = new ShellCommand(null, 'yarn', 'outdated', '--json')
    .setNoExceptions() // `yarn outdated` returns exit code 1 when we have outdated dependencies
    .runSynchronously()
    .getStdout();

  const outdatedData = data
    .split('\n')
    .filter(Boolean)
    .map(d => JSON.parse(d))
    .filter(j => j.type === 'table')[0].data;

  outdatedData.body.forEach(function(row) {
    const dependency = {
      packageName: row[0],
      packageType: row[5],
      packageURL: row[6],
      workspaceName: row[4],
      versionCurrent: row[1],
      versionLatest: row[3],
    };

    if (semver.satisfies(dependency.versionCurrent, dependency.versionLatest) === false) {
      if (dependency.workspaceName === '') {
        // This dependency is not part of any workspace (must be root package.json).
        const packageJSONLocation = findRootPackageJsonPath();
        bumpDependency(
          dependency,
          // $FlowAllowDynamicImport
          require(packageJSONLocation),
          packageJSONLocation,
        );
      } else {
        Workspaces.iterateWorkspaces(packageJSONLocation => {
          // $FlowAllowDynamicImport
          const packageJSON = require(packageJSONLocation);
          if (packageJSON.name === dependency.workspaceName) {
            bumpDependency(dependency, packageJSON, packageJSONLocation);
          }
        });
      }
    }
  });

  // TODO: yarn upgrade as well (?)
  new ShellCommand(null, 'yarn', 'install').setOutputToScreen().runSynchronously();

  cb();
}
