#!/usr/bin/env node
// @flow

import { invariant } from '@adeira/js';

import strictLint from './migrate/strict-lint';
import typesFirst from './migrate/types-first';

// yarn monorepo-babel-node src/packages/flow-bin/bin/migrate.js types-first node_modules/.bin/flow src/packages/js
// yarn monorepo-babel-node src/packages/flow-bin/bin/migrate.js strict-lint node_modules/.bin/flow src/packages/js

const argv = process.argv.splice(2);
invariant(argv.length === 3, 'Usage: <strict-lint|types-first> <flowPath> <path>');

// There is currently no nice interface/validations - only people who know what they are doing should use it.
const project = argv[0];
const flowPath = argv[1];
const path = argv[2];

switch (project) {
  case 'strict-lint':
    strictLint(flowPath, path);
    break;
  case 'types-first':
    typesFirst(flowPath, path);
    break;
  default:
    throw new Error('unknown project');
}
