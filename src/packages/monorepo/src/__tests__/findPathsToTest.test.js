// @flow

import findPathsToTest from '../findPathsToTest';
import workspaceDependencies from './workspaceDependencies';

it('finds dirty paths to test based on the changed files', () => {
  const warnings = [];
  const spy = jest
    .spyOn(console, 'warn')
    .mockImplementation((...args) => warnings.push(args));

  expect(
    findPathsToTest(workspaceDependencies, [
      '/unknown_path',
      '/path/src/packages/signed-source/index.js',
      '/path/src/apps/index.js',
    ]),
    // Relevant workspace here are @kiwicom/graphql and @kiwicom/signed-source.
    // However signed-source is a dependency of @kiwicom/graphql-bc-checker and
    // therefore it's relevant as well (see workspace dependencies).
  ).toMatchInlineSnapshot(`
Set {
  "src/apps",
  "src/packages/signed-source",
  "src/packages/bc-checker",
}
`);

  expect(warnings).toMatchInlineSnapshot(`
Array [
  Array [
    "DIRTY WORKSPACES: ",
    Set {
      "@kiwicom/graphql",
      "@kiwicom/signed-source",
    },
  ],
  Array [
    "WORKSPACES TO TEST: ",
    Set {
      "@kiwicom/graphql",
      "@kiwicom/signed-source",
      "@kiwicom/graphql-bc-checker",
    },
  ],
  Array [
    "PATHS TO TEST: ",
    Set {
      "src/apps",
      "src/packages/signed-source",
      "src/packages/bc-checker",
    },
  ],
]
`);
  spy.mockRestore();
});
