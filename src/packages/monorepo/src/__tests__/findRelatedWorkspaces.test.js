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
