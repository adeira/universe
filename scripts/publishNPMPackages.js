// @flow

import os from 'os';
import path from 'path';
import publish from '@adeira/monorepo-npm-publisher';
import { invariant } from '@adeira/js';

import publishedPackages from './publishedPackages.json';
// yarn monorepo-babel-node scripts/publishNPMPackages.js

/* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses an error
 * when upgrading Flow to version 0.200.0. To see the error delete this comment
 * and run Flow. */
(async () => {
  const npmAuthToken = process.env.NPM_AUTH_TOKEN;

  invariant(
    npmAuthToken != null,
    'Environment variable NPM_AUTH_TOKEN must be set in order to use NPM publisher.',
  );

  await publish({
    buildCache: path.join(os.tmpdir(), 'com.adeira.universe.npm', '.build'),
    dryRun: false,
    npmAuthToken,
    workspaces: new Set(publishedPackages),
  });
})();
