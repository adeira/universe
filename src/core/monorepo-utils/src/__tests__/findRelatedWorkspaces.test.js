// @flow strict

import findRelatedWorkspaces from '../findRelatedWorkspaces';
import workspaceDependencies from './workspaceDependencies';

it('finds related workspaces based on touched workspaces', () => {
  // nobody uses `@kiwicom/graphql` as a dependency so it should return only itself
  expect(findRelatedWorkspaces(workspaceDependencies, new Set(['@kiwicom/graphql'])))
    .toMatchInlineSnapshot(`
    Set {
      "@kiwicom/graphql",
    }
  `);

  // `@kiwicom/fetch` is used in many projects so all these projects
  // should be tested (recursively - see the example projects)
  expect(findRelatedWorkspaces(workspaceDependencies, new Set(['@kiwicom/fetch'])))
    .toMatchInlineSnapshot(`
    Set {
      "@kiwicom/fetch",
      "@kiwicom/automator",
      "@kiwicom/graphql-skymock",
      "@kiwicom/graphql",
      "@kiwicom/relay",
      "example-react-native",
      "relay-example",
      "@kiwicom/vault2env",
    }
  `);
});

it("doesn't crash with circular dependencies - simple circle", () => {
  const circularWorkspaceDependencies = {
    //         *
    // aaa -> bbb -> aaa
    aaa: {
      workspaceDependencies: ['bbb'],
      location: '',
      mismatchedWorkspaceDependencies: [],
    },
    bbb: {
      workspaceDependencies: ['aaa'],
      location: '',
      mismatchedWorkspaceDependencies: [],
    },
  };

  // 'aaa' is dirty
  // 'bbb' uses 'aaa' so it's dirty as well
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['aaa'])))
    .toMatchInlineSnapshot(`
    Set {
      "aaa",
      "bbb",
    }
  `);

  // 'bbb' is dirty
  // 'aaa' uses 'bbb' so it's dirty as well
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['bbb'])))
    .toMatchInlineSnapshot(`
    Set {
      "bbb",
      "aaa",
    }
  `);
});

it("doesn't crash with circular dependencies - complex circle", () => {
  const circularWorkspaceDependencies = {
    //                *
    // aaa -> bbb -> ccc -> ddd
    //         ^-------------`
    aaa: {
      workspaceDependencies: ['bbb'],
      location: '',
      mismatchedWorkspaceDependencies: [],
    },
    bbb: {
      workspaceDependencies: ['ccc'],
      location: '',
      mismatchedWorkspaceDependencies: [],
    },
    ccc: {
      workspaceDependencies: ['ddd'],
      location: '',
      mismatchedWorkspaceDependencies: [],
    },
    ddd: {
      workspaceDependencies: ['bbb'],
      location: '',
      mismatchedWorkspaceDependencies: [],
    },
  };

  // nobody uses 'aaa' so there are no additional dependencies
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['aaa'])))
    .toMatchInlineSnapshot(`
    Set {
      "aaa",
    }
  `);

  // 'bbb' is dirty
  // 'aaa' & 'ddd' use 'bbb' so they are dirty as well
  // nobody uses 'aaa' so there are no additional dependencies
  // 'ccc' uses 'ddd' so it's dirty as well
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['bbb'])))
    .toMatchInlineSnapshot(`
    Set {
      "bbb",
      "aaa",
      "ddd",
      "ccc",
    }
  `);

  // 'ccc' is dirty
  // 'bbb' uses 'ccc' so it's dirty as well
  // 'aaa' & 'ddd' use 'bbb' so they are dirty as well
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['ccc'])))
    .toMatchInlineSnapshot(`
    Set {
      "ccc",
      "bbb",
      "aaa",
      "ddd",
    }
  `);

  // 'ddd' is dirty
  // 'ccc' uses 'ddd' so it's dirty as well
  // 'bbb' uses 'ccc' so it's dirty as well
  // 'aaa' & 'ddd' use 'bbb' so they are dirty as well (but 'ddd' is already there)
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['ddd'])))
    .toMatchInlineSnapshot(`
    Set {
      "ddd",
      "ccc",
      "bbb",
      "aaa",
    }
  `);
});

it('resolves mismatched workspace dependencies correctly', () => {
  const circularWorkspaceDependencies = {
    aaa: {
      location: '',
      workspaceDependencies: ['bbb'],
      mismatchedWorkspaceDependencies: ['ccc'],
    },
    bbb: {
      location: '',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
    ccc: {
      location: '',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
  };

  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['aaa'])))
    .toMatchInlineSnapshot(`
    Set {
      "aaa",
    }
  `);
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['bbb'])))
    .toMatchInlineSnapshot(`
    Set {
      "bbb",
      "aaa",
    }
  `);
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['ccc'])))
    .toMatchInlineSnapshot(`
    Set {
      "ccc",
      "aaa",
    }
  `);
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['aaa', 'ccc'])))
    .toMatchInlineSnapshot(`
    Set {
      "aaa",
      "ccc",
    }
  `);
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['aaa', 'bbb'])))
    .toMatchInlineSnapshot(`
    Set {
      "aaa",
      "bbb",
    }
  `);
  expect(findRelatedWorkspaces(circularWorkspaceDependencies, new Set(['aaa', 'bbb', 'ccc'])))
    .toMatchInlineSnapshot(`
    Set {
      "aaa",
      "bbb",
      "ccc",
    }
  `);
});
