// @flow strict-local

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@kiwicom/monorepo';

import isValidLicense from '../isValidLicense';

// Every package must have either:
// - licence defined as UNLICENSED and no license file, or
// - license defined as MIT and contain license file

const supportedLicenses = ['UNLICENSED', 'MIT'];

Workspaces.iterateWorkspaces(packageJSONLocation => {
  // $FlowAllowDynamicImport
  const packageJson = require(packageJSONLocation);
  test(`License for workspace ${packageJson.name}`, () => {
    const license = packageJson.license;

    expect(
      license !== undefined && supportedLicenses.includes(license),
    ).toGiveHelp(
      `Every workspace must define its license in package.json file. It should be one of: ${supportedLicenses.join(
        ', ',
      )}`,
    );

    // license file should be on the same level as package.json
    const licenseFilePath = path.join(
      path.dirname(packageJSONLocation),
      'LICENSE',
    );

    if (license === 'UNLICENSED') {
      expect(fs.existsSync(licenseFilePath) === false).toGiveHelp(
        'Unlicensed workspaces should not have LICENSE file in their root.',
      );
    } else if (license === 'MIT') {
      expect(fs.existsSync(licenseFilePath) === true).toGiveHelp(
        'Unlicensed workspaces must have LICENSE file in their root.',
      );
      expect(
        isValidLicense(fs.readFileSync(licenseFilePath, 'utf8')) === true,
      ).toGiveHelp(
        'MIT license should follow standard format with Kiwi.com copyright',
      );
    } else {
      throw new Error(
        `Unknown workspace license. Supported licenses are: ${supportedLicenses.join(
          ', ',
        )}`,
      );
    }
  });
});
