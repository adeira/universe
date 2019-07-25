#!/usr/bin/env node

// @flow

require('@babel/register')({
  ignore: [/node_modules\/(?!@kiwicom)/],
  rootMode: 'upward',
});

require('../src/protoToGraphqlPlugin');
