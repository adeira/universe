// @flow strict-local

import path from 'path';

import testExportedPaths from '../../__tests__/testExportedPaths';

const root = 'src/platform/orbit-design-tokens/';

testExportedPaths(path.join(__dirname, '..', 'orbit-design-tokens.js'), [
  [`${root}package.json`, 'package.json'],
  [`${root}src/index.js`, 'src/index.js'],

  // special cases:
  [`${root}__github__/.circleci/config.yml`, '.circleci/config.yml'],
  [`${root}__github__/.editorconfig`, '.editorconfig'],
  [`${root}__github__/.flowconfig`, '.flowconfig'],
  [
    `${root}__github__/.github/ISSUE_TEMPLATE/bug_Report.md`,
    '.github/ISSUE_TEMPLATE/bug_Report.md',
  ],
  [`${root}__github__/.prettierrc`, '.prettierrc'],
  [`${root}__github__/flow-typed/xyz.js`, 'flow-typed/xyz.js'],
  [`${root}yarn.lock`, undefined], // correctly deleted

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
