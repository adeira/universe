// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import { findRootPackageJsonPath } from '@adeira/monorepo-utils';

// https://help.github.com/articles/about-codeowners/

function* iterateRules() {
  const root = path.dirname(findRootPackageJsonPath());
  const codeownersPath = path.join(root, '.github', 'CODEOWNERS');
  const codeowners = fs.readFileSync(codeownersPath, 'utf8');

  for (const line of codeowners.split(os.EOL)) {
    if (line === '') {
      // empty
      continue;
    }
    if (/^#(?<comment>.*)/.test(line)) {
      continue;
    }
    yield line;
  }
}

it('hast to have core maintainers for every part of the project', () => {
  expect.hasAssertions();
  const requiredCodeowners = ['@adeira/devs'];
  for (const line of iterateRules()) {
    for (const codeowner of requiredCodeowners) {
      expect(line).toMatch(codeowner);
    }
  }
});
