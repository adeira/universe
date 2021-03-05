#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js and fetch-schema
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward-optional',
});

const { invariant } = require('@adeira/js');
const Logger = require('@adeira/logger').default;
const RelayConfig = require('relay-config');

const compiler = require('../src/compiler').default;
const { relayCompilerOptions } = require('./commander/options');

const options = relayCompilerOptions(process.argv);

const config = {
  src: options.src, // required
  schema: options.schema, // required
  persistMode: options.persistMode,
  validate: options.validate,
  watch: options.watch,
  ...RelayConfig.loadConfig(),
};

invariant(config.src != null, 'Option --src is required.');
invariant(config.schema != null, 'Option --schema is required.');
invariant(
  config.persistMode === undefined || config.persistMode === 'fs',
  'Only filesystem persist mode is currently supported.',
);

// TODO: try to download the schema automatically?
// But please note: some projects are using in-memory server for example and therefore it's not
// possible to "fetch" the schema since there is no URL. Such projects has to sign their
// snapshot manually.

// $FlowFixMe[prop-missing]: errors after upgrading to relay 9.1.0
// $FlowFixMe[incompatible-call]: errors after upgrading to relay 9.1.0
compiler(config).catch((error) => {
  Logger.error(error);
  process.exit(1);
});
