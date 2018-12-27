// @flow

import findRelatedWorkspaces from '../findRelatedWorkspaces';
import workspaceDependencies from './workspaceDependencies';

it('finds related workspaces based on touched workspaces', () => {
  expect(
    findRelatedWorkspaces(workspaceDependencies, new Set(['@kiwicom/graphql'])),
  ).toMatchInlineSnapshot(`
Set {
  "@kiwicom/graphql",
}
`);

  expect(
    findRelatedWorkspaces(
      workspaceDependencies,
      new Set(['@kiwicom/signed-source']),
    ),
  ).toMatchInlineSnapshot(`
Set {
  "@kiwicom/signed-source",
  "@kiwicom/graphql-bc-checker",
  "@kiwicom/graphql",
}
`);
});
