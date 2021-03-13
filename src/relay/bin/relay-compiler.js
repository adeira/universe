#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js and fetch-schema
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward-optional',
});

const Logger = require('@adeira/logger').default;

const compiler = require('../src/compiler').default;
const { relayCompilerOptions } = require('./commander/options');

const options = relayCompilerOptions(process.argv);

compiler(options).catch((error) => {
  Logger.error(error);
  process.exit(1);
});
