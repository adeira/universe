// @flow

const workspaceDependencies = {
  // has workspaceDependencies (see bellow)
  '@kiwicom/graphql': {
    location: 'src/apps',
    workspaceDependencies: [
      '@kiwicom/graphql-bc-checker',
      '@kiwicom/graphql-global-id',
    ],
    mismatchedWorkspaceDependencies: [],
  },
  // doesn't have any dependencies
  '@kiwicom/automator': {
    location: 'src/packages/automator',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  // has workspaceDependencies and it's itself a dependency
  '@kiwicom/graphql-bc-checker': {
    location: 'src/packages/bc-checker',
    workspaceDependencies: ['@kiwicom/signed-source'],
    mismatchedWorkspaceDependencies: [],
  },
  // it is a dependency
  '@kiwicom/graphql-global-id': {
    location: 'src/packages/global-id',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  // it is a dependency of dependency
  '@kiwicom/signed-source': {
    location: 'src/packages/signed-source',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
};

export default workspaceDependencies;
