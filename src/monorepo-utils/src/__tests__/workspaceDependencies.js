// @flow strict

import sanitizeWorkspaces from '../sanitizeWorkspaces';

// This is actual output of `yarn workspaces info` to this date.
export default sanitizeWorkspaces({
  '@adeira/automator': {
    location: 'src/apps/automator',
    workspaceDependencies: [
      '@kiwicom/test-utils',
      '@kiwicom/environment',
      '@adeira/fetch',
      '@kiwicom/graphql-skymock',
      '@adeira/js',
      '@kiwicom/monorepo',
    ],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/bag-transfer-customer-app': {
    location: 'src/apps/bag-transfer-customer-app',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/docs': {
    location: 'src/apps/docs',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  'example-react-native': {
    location: 'src/apps/example-react-native',
    workspaceDependencies: ['@adeira/relay'],
    mismatchedWorkspaceDependencies: [],
  },
  'graphql-schema-design': {
    location: 'src/apps/graphql-schema-design',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/graphql-skymock': {
    location: 'src/apps/graphql-skymock',
    workspaceDependencies: ['@kiwicom/test-utils', '@adeira/fetch', '@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/graphql': {
    location: 'src/apps/graphql',
    workspaceDependencies: [
      '@kiwicom/test-utils',
      '@kiwicom/environment',
      '@adeira/fetch',
      '@adeira/graphql-bc-checker',
      '@kiwicom/graphql-global-id',
      '@kiwicom/graphql-monitoring',
      '@kiwicom/graphql-resolve-wrapper',
      '@kiwicom/graphql-skymock',
      '@kiwicom/graphql-utils',
    ],
    mismatchedWorkspaceDependencies: [],
  },
  'relay-example': {
    location: 'src/apps/relay-example',
    workspaceDependencies: ['@kiwicom/babel-preset-kiwicom', '@adeira/relay'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/babel-preset-kiwicom': {
    location: 'src/packages/babel-preset-kiwicom',
    workspaceDependencies: ['@kiwicom/test-utils'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/environment': {
    location: 'src/packages/environment',
    workspaceDependencies: ['@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/eslint-config': {
    location: 'src/packages/eslint-config-kiwicom',
    workspaceDependencies: ['@kiwicom/monorepo', 'eslint-plugin-kiwicom-incubator'],
    mismatchedWorkspaceDependencies: [],
  },
  'eslint-plugin-kiwicom-incubator': {
    location: 'src/packages/eslint-plugin-kiwicom-incubator',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  '@adeira/fetch': {
    location: 'src/packages/fetch',
    workspaceDependencies: ['@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@adeira/graphql-bc-checker': {
    location: 'src/packages/graphql-bc-checker',
    workspaceDependencies: ['@kiwicom/test-utils'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/graphql-global-id': {
    location: 'src/packages/graphql-global-id',
    workspaceDependencies: ['@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/graphql-monitoring': {
    location: 'src/packages/graphql-monitoring',
    workspaceDependencies: ['@kiwicom/environment', '@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/graphql-resolve-wrapper': {
    location: 'src/packages/graphql-resolve-wrapper',
    workspaceDependencies: ['@kiwicom/test-utils'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/graphql-utils': {
    location: 'src/packages/graphql-utils',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  '@adeira/js': {
    location: 'src/packages/js',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/monorepo-npm-publisher': {
    location: 'src/packages/monorepo-npm-publisher',
    workspaceDependencies: ['@kiwicom/babel-preset-kiwicom', '@kiwicom/monorepo'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/monorepo-shipit': {
    location: 'src/core/monorepo-shipit',
    workspaceDependencies: ['@adeira/js', '@kiwicom/monorepo', '@kiwicom/test-utils'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/monorepo': {
    location: 'src/packages/monorepo',
    workspaceDependencies: ['@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@adeira/relay': {
    location: 'src/packages/relay',
    workspaceDependencies: ['@adeira/fetch', '@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/test-utils': {
    location: 'src/packages/test-utils',
    workspaceDependencies: ['@adeira/js'],
    mismatchedWorkspaceDependencies: [],
  },
  '@kiwicom/vault2env': {
    location: 'src/packages/vault2env',
    workspaceDependencies: ['@adeira/fetch'],
    mismatchedWorkspaceDependencies: [],
  },
});
