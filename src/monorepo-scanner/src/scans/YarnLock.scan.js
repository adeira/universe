// @flow

import fs from 'fs';
import path from 'path';
import { findMonorepoRoot } from '@adeira/monorepo-utils';

const yarnLockPath = path.join(findMonorepoRoot(), 'yarn.lock');

const yarnLockContent = fs.readFileSync(yarnLockPath, 'utf-8');

test('yarn.lock does not contain adeira packages', () => {
  expect(/@adeira/g.test(yarnLockContent)).toBe(false);
});
