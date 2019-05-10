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
      'eslint-plugin-kiwicom-incubator',
      '@kiwicom/graphql-bc-checker',
      '@kiwicom/graphql-global-id',
      '@kiwicom/js',
      '@kiwicom/graphql-resolve-wrapper',
      '@kiwicom/monorepo-npm-publisher',
      '@kiwicom/graphql-utils',
      '@kiwicom/monorepo',
      '@kiwicom/babel-preset-kiwicom',
      '@kiwicom/fetch',
      '@kiwicom/vault2env',
      '@kiwicom/relay',
      '@kiwicom/eslint-config',
      '@kiwicom/test-utils',
    ]),
  });
})();
