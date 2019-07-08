// @flow strict-local

import { findMonorepoRoot } from '@kiwicom/monorepo-utils';

import RepoGIT from '../src/RepoGIT';

// yarn monorepo-babel-node src/core/monorepo-shipit/bin/create-patch.js <HASH>
const argv = process.argv.slice(2);

const repo = new RepoGIT(findMonorepoRoot());
const patch = repo.getNativePatchFromID(argv[0]);

/* eslint-disable no-console */
console.log('~~~~~~~~~~~~~~~~~~~~');
console.log(patch);
console.log('~~~~~~~~~~~~~~~~~~~~');
