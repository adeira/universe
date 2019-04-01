// @flow

import path from 'path';
import publish from '@kiwicom/npm-publisher';
import { invariant } from '@kiwicom/js';

import paths from '../paths';

// yarn babel-node scripts/publishNPMPackages.js

const npmAuthToken = process.env.NPM_AUTH_TOKEN;

invariant(
  npmAuthToken,
  'Environment variable NPM_AUTH_TOKEN must be set in order to use NPM publisher.',
);

(async () => {
  await publish({
    buildCache: paths.buildCache,
    packages: path.join(__dirname, '..', 'src', 'packages'),
    npmAuthToken,
    dryRun: false,
  });
})();
