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
    packages: path.join(__dirname, '..', 'src', 'packages'),
  });
})();
