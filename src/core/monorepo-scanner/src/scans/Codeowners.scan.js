// @flow

import os from 'os';
import fs from 'fs';
import path from 'path';
import { findRootPackageJsonPath } from '@kiwicom/monorepo-utils';

// https://docs.gitlab.com/ee/user/project/code_owners.html

function* iterateRules() {
  const root = path.dirname(findRootPackageJsonPath());
  const codeownersPath = path.join(root, 'CODEOWNERS');
  const codeowners = fs.readFileSync(codeownersPath, 'utf8');

  for (const line of codeowners.split(os.EOL)) {
    if (line === '') {
      // empty
      continue;
    }
    if (/^#(?<comment>.*)|^\*/.test(line)) {
      continue;
    }

    yield line;
  }
}

test('codeowners paths', () => {
  expect.hasAssertions();
  const root = path.dirname(findRootPackageJsonPath());
  for (const line of iterateRules()) {
    const parsedLine = line.match(/^(?<path>[^\s]+)/);
    const projectPath = String(parsedLine?.groups?.path);
    expect({
      pathExists: fs.existsSync(path.join(root, projectPath)),
      path: projectPath,
    }).toEqual({
      pathExists: true,
      path: projectPath,
    });
  }
});

test('core maintainers', () => {
  expect.hasAssertions();
  const requiredCodeowners = ['martin.zlamal@kiwi.com', 'trond.bergquist@kiwi.com'];
  for (const line of iterateRules()) {
    for (const codeowner of requiredCodeowners) {
      expect(line).toMatch(codeowner);
    }
  }
});
