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
      '/unknown_path', // doesn't exist and therefore is not being reflected in the output
      '/src/packages/fetch/src/fetchWithRetries.js', // should run `@kiwicom/fetch` and all the related packages (see findRelatedWorkspaces.test.js)
    ]),
  ).toMatchInlineSnapshot(`
    Set {
      "src/packages/fetch/",
      "src/apps/automator/",
      "src/apps/graphql-skymock/",
      "src/apps/graphql/",
      "src/packages/relay/",
      "src/apps/example-react-native/",
      "src/apps/relay-example/",
      "src/packages/vault2env/",
    }
  `);

  expect(warnings).toMatchInlineSnapshot(`
    Array [
      Array [
        "DIRTY WORKSPACES:",
        Set {
          "@kiwicom/fetch",
        },
      ],
      Array [
        "TESTING WORKSPACES:",
        Set {
          "@kiwicom/fetch",
          "@kiwicom/automator",
          "@kiwicom/graphql-skymock",
          "@kiwicom/graphql",
          "@kiwicom/relay",
          "example-react-native",
          "relay-example",
          "@kiwicom/vault2env",
        },
      ],
    ]
  `);
  spy.mockRestore();
});
