// @flow

import { __resolveWorkspaces } from '../Workspaces';

test.each([
  {
    private: true,
    workspaces: ['src/apps/*', 'src/finance/**', 'src/packages/*'],
  },
  {
    private: true,
    workspaces: {
      packages: ['src/apps/*', 'src/finance/**', 'src/packages/*'],
      nohoist: ['**/react-native', '**/react-native/**'],
    },
  },
])('%# resolves workspaces correctly', packageJSON => {
  expect(__resolveWorkspaces(packageJSON)).toEqual([
    'src/apps/*',
    'src/finance/**',
    'src/packages/*',
  ]);
});

test.each([
  {
    private: true,
  },
  {
    private: true,
    workspaces: {
      nohoist: ['**/react-native', '**/react-native/**'],
    },
  },
])('%# fails if there are no workspaces', packageJSON => {
  expect(() => __resolveWorkspaces(packageJSON)).toThrow(
    'Cannot find workspaces definition.',
  );
});
