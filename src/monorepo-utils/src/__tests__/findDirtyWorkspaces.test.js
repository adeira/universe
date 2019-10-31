// @flow strict

import findDirtyWorkspaces from '../findDirtyWorkspaces';
import workspaceDependencies from './workspaceDependencies';

it('finds dirty workspaces based on path', () => {
  expect(
    findDirtyWorkspaces(workspaceDependencies, [
      '/unknown_path', // doesn't exist and therefore doesn't emit any workspace
      '/path/src/apps/graphql-schema-design/src/schema.js', // potentially ambiguous with `src/apps/graphql` when matching (GraphQL itself should not be in the output)
      '/path/src/packages/monorepo/src/index.js',
    ]),
  ).toMatchInlineSnapshot(`
Set {
  "graphql-schema-design",
  "@kiwicom/monorepo",
}
`);
});
