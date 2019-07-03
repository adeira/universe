// @flow strict

import findRelatedWorkspaceLocations from '../findRelatedWorkspaceLocations';

it('works with happy path', () => {
  const workspaces = {
    aaa: {
      location: 'src/aaa',
      workspaceDependencies: ['bbb', 'ccc'],
      mismatchedWorkspaceDependencies: [],
    },
    bbb: {
      location: 'src/bbb',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
    ccc: {
      location: 'src/ccc',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
  };
  expect(findRelatedWorkspaceLocations(workspaces, 'aaa')).toEqual(
    new Set(['src/aaa', 'src/bbb', 'src/ccc']),
  );
  expect(findRelatedWorkspaceLocations(workspaces, 'bbb')).toEqual(
    new Set(['src/bbb']),
  );
  expect(findRelatedWorkspaceLocations(workspaces, 'ccc')).toEqual(
    new Set(['src/ccc']),
  );
});

it('works with deep workspaces', () => {
  const workspaces = {
    aaa: {
      location: 'src/aaa',
      workspaceDependencies: ['bbb'],
      mismatchedWorkspaceDependencies: [],
    },
    bbb: {
      location: 'src/bbb',
      workspaceDependencies: ['ccc'],
      mismatchedWorkspaceDependencies: [],
    },
    ccc: {
      location: 'src/ccc',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
  };
  expect(findRelatedWorkspaceLocations(workspaces, 'aaa')).toEqual(
    new Set(['src/aaa', 'src/bbb', 'src/ccc']),
  );
  expect(findRelatedWorkspaceLocations(workspaces, 'bbb')).toEqual(
    new Set(['src/bbb', 'src/ccc']),
  );
  expect(findRelatedWorkspaceLocations(workspaces, 'ccc')).toEqual(
    new Set(['src/ccc']),
  );
});

it('works with recursion', () => {
  const workspaces = {
    aaa: {
      location: 'src/aaa',
      workspaceDependencies: ['bbb'],
      mismatchedWorkspaceDependencies: [],
    },
    bbb: {
      location: 'src/bbb',
      workspaceDependencies: ['ccc'],
      mismatchedWorkspaceDependencies: [],
    },
    ccc: {
      location: 'src/ccc',
      workspaceDependencies: ['aaa'],
      mismatchedWorkspaceDependencies: [],
    },
  };
  expect(findRelatedWorkspaceLocations(workspaces, 'aaa'))
    .toMatchInlineSnapshot(`
      Set {
        "src/aaa",
        "src/bbb",
        "src/ccc",
      }
    `);
  expect(findRelatedWorkspaceLocations(workspaces, 'bbb'))
    .toMatchInlineSnapshot(`
      Set {
        "src/bbb",
        "src/ccc",
        "src/aaa",
      }
    `);
  expect(findRelatedWorkspaceLocations(workspaces, 'ccc'))
    .toMatchInlineSnapshot(`
      Set {
        "src/ccc",
        "src/aaa",
        "src/bbb",
      }
    `);
});

it('works with mismatched workspace dependencies', () => {
  // workspace has mismatched dependencies when we require different version
  // from what's available directly in the monorepo (older version for example)
  const workspaces = {
    aaa: {
      location: 'src/aaa',
      workspaceDependencies: ['bbb'],
      mismatchedWorkspaceDependencies: ['ccc'],
    },
    bbb: {
      location: 'src/bbb',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: ['ddd'],
    },
    ccc: {
      location: 'src/ccc',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
    ddd: {
      location: 'src/ddd',
      workspaceDependencies: [],
      mismatchedWorkspaceDependencies: [],
    },
  };
  expect(findRelatedWorkspaceLocations(workspaces, 'aaa')).toEqual(
    new Set(['src/aaa', 'src/bbb', 'src/ccc', 'src/ddd']),
  );
  expect(findRelatedWorkspaceLocations(workspaces, 'bbb')).toEqual(
    new Set(['src/bbb', 'src/ddd']),
  );
  expect(findRelatedWorkspaceLocations(workspaces, 'ccc')).toEqual(
    new Set(['src/ccc']),
  );
});
