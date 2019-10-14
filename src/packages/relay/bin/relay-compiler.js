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
const RelayConfig = require('relay-config');

const compiler = require('../src/compiler').default;

const collectPaths = value => {
  return value.split(',');
};

// Please note: try not to extend this CLI if possible. Always prefer "relay.config.js" file.
program
  .option('--src <src>')
  .option('--schema <schema>')
  .option('--persist-mode <fs|remote>')
  .option('--include <include>', 'Comma separated list of directories to include.', collectPaths, [
    '**',
  ])
  .option('--exclude <exclude>', 'Comma separated list of directories to ignore.', collectPaths, [
    // allowed in __tests__
    '**/__flowtests__/**',
    '**/__generated__/**',
    '**/__mocks__/**',
    '**/node_modules/**',
  ])
  .option('--validate', 'Activates validate only mode', false)
  .option(
    '--watch',
    'This option currently REQUIRES Watchman (https://facebook.github.io/watchman/) to be installed.',
    false,
  )
  .parse(process.argv);

const config = {
  src: program.src, // required
  schema: program.schema, // required
  persistMode: program.persistMode,
  validate: program.validate,
  watch: program.watch,
  include: program.include,
  exclude: program.exclude,
  ...RelayConfig.loadConfig(),
};

invariant(config.src, 'Option --src is required.');
invariant(config.schema, 'Option --schema is required.');
invariant(
  config.persistMode === undefined || config.persistMode === 'fs',
  'Only filesystem persist mode is currently supported.',
);

// TODO: try to download the schema automatically?
// But please note: some projects are using in-memory server for example and therefore it's not
// possible to "fetch" the schema since there is no URL. Such projects has to sign their
// snapshot manually.

compiler(config).catch(error => {
  Logger.error(error);
  process.exit(1);
});
