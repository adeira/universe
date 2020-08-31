// @flow

import pluginTester from 'babel-plugin-tester';

const path = require('path');

const plugin = require('../');

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    plugins: ['@babel/plugin-syntax-flow', '@babel/plugin-syntax-jsx'],
  },
});
