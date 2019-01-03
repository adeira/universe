// @flow

import findPathsToTest from '../findPathsToTest';
import workspaceDependencies from './workspaceDependencies';

it('finds dirty paths to test based on the changed files', () => {
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
});
