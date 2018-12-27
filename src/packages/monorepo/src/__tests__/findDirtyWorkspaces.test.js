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
