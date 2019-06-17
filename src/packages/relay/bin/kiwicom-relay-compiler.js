#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js
require('@babel/register')({
  ignore: [/node_modules\/(?!@kiwicom)/],
  rootMode: 'upward',
  plugins: ['relay'], // TODO: how to work with babelrc files (?)
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
