// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import { findRootPackageJsonPath } from '@kiwicom/monorepo-utils';

// https://docs.gitlab.com/ee/user/project/code_owners.html

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

test('core maintainers', () => {
  expect.hasAssertions();
  const requiredCodeowners = ['@mrtnzlml', '@tbergq', '@jaroslav-kubicek', '@michalsanger'];
  for (const line of iterateRules()) {
    for (const codeowner of requiredCodeowners) {
      expect(line).toMatch(codeowner);
    }
  }
});
