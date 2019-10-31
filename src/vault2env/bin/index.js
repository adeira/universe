#!/usr/bin/env node

// @flow

import program from 'commander';

import runner from '../src/index';

program
  .option('--token <token>')
  .option('--addr <addr>')
  .option('--path <path>')
  .option('--force')
  .parse(process.argv);

runner(program);
