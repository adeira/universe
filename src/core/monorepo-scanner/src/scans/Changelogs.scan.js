// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { Workspaces } from '@kiwicom/monorepo-utils';

// https://keepachangelog.com/en/1.0.0/

Workspaces.iterateWorkspaces(packageJSONLocation => {
  const packagePath = path.dirname(packageJSONLocation);
  // $FlowAllowDynamicImport
  const packageJson = require(packageJSONLocation);

  if (semver.gte(packageJson.version, '1.1.0')) {
    const changelogPath = path.join(packagePath, 'CHANGELOG.md');
    test(changelogPath, () => {
      expect(fs.existsSync(changelogPath) === true).toGiveHelp(
        `Changelog doesn't exist: ${changelogPath}`,
      );

      const changelog = fs.readFileSync(changelogPath).toString();
      const changelogRows = changelog.split(os.EOL);

      // first part of the changelog is dedicated to unreleased changes (can be empty)
      expect(changelogRows[0] === '# Unreleased').toGiveHelp(
        'Changelog must contain section "Unreleased" even though it is empty.',
      );

      // changelog should contain the last version number (patches are ignored)
      const majorVersion = semver.major(packageJson.version);
      const minorVersion = semver.minor(packageJson.version);
      expect(changelog).toMatch(new RegExp(`\n# ${majorVersion}.${minorVersion}.0`));

      const versionTitleRegexp = /# (?<version>[0-9]+\.[0-9]+\.[0-9])+/g;
      let result;
      while ((result = versionTitleRegexp.exec(changelog)) !== null) {
        const foundVersion = result?.groups?.version ?? '0.0.0';
        const latestVersion = packageJson.version;
        if (semver.gt(foundVersion, latestVersion)) {
          throw new Error(
            `Changelog contains information about unreleased version ${foundVersion} but the latest version should be ${latestVersion}. Please use "Unreleased" section instead.`,
          );
        }
      }
    });
  }
});
