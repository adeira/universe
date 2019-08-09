// @flow

import os from 'os';
import path from 'path';
import publish from '@kiwicom/monorepo-npm-publisher';
import { invariant } from '@kiwicom/js';

// yarn monorepo-babel-node scripts/publishNPMPackages.js

(async () => {
  const npmAuthToken = process.env.NPM_AUTH_TOKEN;

  invariant(
    npmAuthToken,
    'Environment variable NPM_AUTH_TOKEN must be set in order to use NPM publisher.',
  );

  await publish({
    buildCache: path.join(os.tmpdir(), 'com.kiwi.universe.npm', '.build'),
    dryRun: false,
    npmAuthToken,
    workspaces: new Set([
      '@kiwicom/babel-preset-kiwicom',
      '@kiwicom/eslint-config',
      '@kiwicom/fetch',
      '@kiwicom/graphql-bc-checker',
      '@kiwicom/graphql-global-id',
      '@kiwicom/graphql-resolve-wrapper',
      '@kiwicom/graphql-utils',
      '@kiwicom/js',
      '@kiwicom/logger',
      '@kiwicom/monorepo-npm-publisher',
      '@kiwicom/monorepo-utils',
      '@kiwicom/orbit-react-native',
      '@kiwicom/relay',
      '@kiwicom/signed-source',
      '@kiwicom/test-utils',
      '@kiwicom/vault2env',
      'eslint-plugin-kiwicom-incubator',
      'eslint-plugin-relay-imports',
      // TODO: throw when trying to whitelist non-existing workspace
    ]),
  });
})();
