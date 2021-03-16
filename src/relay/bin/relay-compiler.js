#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js and fetch-schema
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward-optional',
});

const compiler = require('../src/compiler').default;
const { relayCompilerOptions } = require('./commander/options');

const options = relayCompilerOptions(process.argv);

compiler(options).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
