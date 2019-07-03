// @flow strict

import path from 'path';

import {
  findRootPackageJson,
  findRootPackageJsonPath,
} from '../findRootPackageJson';

const FAKE_BASE = path.join(
  __dirname,
  'fixtures',
  'workspaces',
  'aaa',
  'bbb',
  'ccc',
  'fakeBase.js',
);

it('finds root package.json correctly', () => {
  expect(findRootPackageJson(FAKE_BASE)).toEqual({
    workspaces: ['fake/aaa/1/*', 'fake/aaa/2/*'],
  });
  expect(findRootPackageJsonPath(FAKE_BASE).replace(__dirname, '')).toBe(
    '/fixtures/workspaces/aaa/package.json',
  );
});
