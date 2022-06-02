#!/usr/bin/env node

/* eslint-disable no-var,ft-flow/require-valid-file-annotation */

var bin = require('relay-compiler');
var spawn = require('child_process').spawn;

var input = process.argv.slice(2);

spawn(bin, input, { stdio: 'inherit' }).on('exit', process.exit);
