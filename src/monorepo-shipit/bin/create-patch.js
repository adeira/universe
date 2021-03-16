// @flow strict-local

import { findMonorepoRoot } from '@adeira/monorepo-utils';

import RepoGit from '../src/RepoGit';

// yarn monorepo-babel-node src/core/monorepo-shipit/bin/create-patch.js <REVISION>
const argv = process.argv.slice(2);
const revision = argv[0];

const repo = new RepoGit(findMonorepoRoot());
const patch = repo.getNativePatchFromID(revision);
const header = repo.getNativeHeaderFromIDWithPatch(revision, patch);

console.log('~~~ HEADER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(header);
console.log('~~~ PATCH ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(patch);
