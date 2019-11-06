// @flow

import os from 'os';
import path from 'path';
import publish from '@adeira/monorepo-npm-publisher';
import { invariant } from '@adeira/js';

// yarn monorepo-babel-node scripts/publishNPMPackages.js

(async () => {
  const npmAuthToken = process.env.NPM_AUTH_TOKEN;

  invariant(
    npmAuthToken != null,
    'Environment variable NPM_AUTH_TOKEN must be set in order to use NPM publisher.',
  );

  await publish({
    buildCache: path.join(os.tmpdir(), 'com.kiwi.universe.npm', '.build'),
    dryRun: false,
    npmAuthToken,
    workspaces: new Set([
      '@adeira/fetch',
      '@adeira/js',
      // TODO: add more BUT only what's actually needed (not every workspace)
      // TODO: throw when trying to whitelist non-existing workspace
    ]),
  });
})();
