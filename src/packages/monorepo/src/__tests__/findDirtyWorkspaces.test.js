// @flow

import findDirtyWorkspaces from '../findDirtyWorkspaces';
import workspaceDependencies from './workspaceDependencies';

it('finds dirty workspaces based on path', () => {
  expect(
    findDirtyWorkspaces(workspaceDependencies, [
      '/unknown_path',
      '/path/src/packages/signed-source/index.js',
      '/path/src/apps/index.js',
    ]),
  ).toMatchInlineSnapshot(`
Set {
  "@kiwicom/graphql",
  "@kiwicom/signed-source",
}
`);
});

it('matches locations correctly', () => {
  // This test simulates what I noticed when checking our CI. Changed files
  // clearly shows that only `graphql-schema-design` workspace is dirty.
  // However, this function matched even `@kiwicom/graphql` because it's
  // location is overlapping.
  expect(
    findDirtyWorkspaces(
      {
        'graphql-schema-design': {
          location: 'src/apps/graphql-schema-design',
          workspaceDependencies: [],
          mismatchedWorkspaceDependencies: [],
        },
        '@kiwicom/graphql': {
          location: 'src/apps/graphql', // this path would match the path bellow as well
          workspaceDependencies: [],
          mismatchedWorkspaceDependencies: [],
        },
      },
      ['src/apps/graphql-schema-design/src/schema.js'],
    ),
  ).toMatchInlineSnapshot(`
Set {
  "graphql-schema-design",
}
`);
});
