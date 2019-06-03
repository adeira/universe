#!/usr/bin/env node

// @flow

import program from 'commander';
import { invariant } from '@kiwicom/js';

import compiler from '../src/compiler';

program
  .option('--src <src>')
  .option('--schema <schema>')
  .parse(process.argv);

invariant(program.src, 'Option --src is required.');
invariant(program.schema, 'Option --schema is required.');

compiler({
  src: program.src,
  schema: program.schema,
});
