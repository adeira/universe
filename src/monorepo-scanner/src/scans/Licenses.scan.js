// @flow strict-local

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

import isValidLicense from '../isValidLicense';

// See: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#license
const supportedLicenses = [
  'UNLICENSED', // special case if you do not wish to grant others the right to use a private or unpublished package under any terms
  'MIT', // https://spdx.org/licenses/MIT.html
  'Unlicense', // https://spdx.org/licenses/Unlicense.html
];

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  const packageJson = require(packageJSONLocation);
  test(`License for workspace ${packageJson.name}`, () => {
    const license = packageJson.license;

    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(license !== undefined && supportedLicenses.includes(license)).toGiveHelp(
      `Every workspace must define its license in package.json file. It should be one of: ${supportedLicenses.join(
        ', ',
      )}`,
    );

    // license file should be on the same level as package.json
    const licenseFilePath = path.join(path.dirname(packageJSONLocation), 'LICENSE');

    if (license === 'UNLICENSED') {
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
      expect(fs.existsSync(licenseFilePath) === false).toGiveHelp(
        'Unlicensed workspaces should NOT have LICENSE file in their root.',
      );
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
      expect(packageJson.private === true).toGiveHelp('All unlicensed packages must be private.');
    } else if (license === 'MIT') {
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
      expect(fs.existsSync(licenseFilePath) === true).toGiveHelp(
        'MIT licenced workspaces must have LICENSE file in their root.',
      );
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
      expect(isValidLicense(fs.readFileSync(licenseFilePath, 'utf8')) === true).toGiveHelp(
        'MIT license should follow standard format with Adeira copyright',
      );
    } else if (license === 'Unlicense') {
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
      expect(fs.existsSync(licenseFilePath) === true).toGiveHelp(
        '"Unlicense" licenced workspaces must have LICENSE file in their root.',
      );
    } else {
      throw new Error(
        `Unknown workspace license. Supported licenses are: ${supportedLicenses.join(', ')}`,
      );
    }
  });
});
