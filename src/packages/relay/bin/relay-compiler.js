#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@kiwicom)/],
  rootMode: 'upward',
});

const program = require('commander');
const { invariant } = require('@kiwicom/js');

const compiler = require('../src/compiler').default;

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
