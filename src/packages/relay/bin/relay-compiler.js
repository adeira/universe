#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js and fetch-schema
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@kiwicom)/],
  rootMode: 'upward',
});

const program = require('commander');
const { invariant } = require('@kiwicom/js');
const Logger = require('@kiwicom/logger').default;
const { Rollout } = require('relay-compiler');
const RelayConfig = require('relay-config'); // eslint-disable-line import/no-extraneous-dependencies

const compiler = require('../src/compiler').default;

program
  .option('--src <src>')
  .option('--schema <schema>')
  .option('--validate')
  .option(
    '--watch',
    'This option currently REQUIRES Watchman (https://facebook.github.io/watchman/) to be installed.',
  )
  // TODO: validate
  .parse(process.argv);

const config = {
  src: program.src,
  schema: program.schema,
  validate: program.validate,
  watch: program.watch,
  ...RelayConfig.loadConfig(),
};

invariant(config.src, 'Option --src is required.');
invariant(config.schema, 'Option --schema is required.');

// TODO: try to download the schema automatically?

Rollout.set(
  new Map([
    [
      // Our implementation of https://relay.dev/docs/en/persisted-queries
      'stored-operations',
      new Set([
        // 'persist-query',
      ]),
    ],
  ]),
);

compiler(config).catch(error => {
  Logger.error(error);
  process.exit(1);
});
