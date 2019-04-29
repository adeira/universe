#!/usr/bin/env node

// @flow strict-local

// See: https://github.com/babel/babel/issues/9921
// It currently doesn't work at all since Babel Parser 7.4.4+ is not compatible
// with shebang and Flow in the same file.

/* eslint-disable */

new Set<() => void>([]);
