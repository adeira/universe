// @flow

import fs from 'fs';
import path from 'path';
import pluginTester from 'babel-plugin-tester';

import getPluginOptions from './options';

const fixturesPath = path.join(__dirname, 'fixtures');
const fixturesFiles = fs.readdirSync(fixturesPath);

const plugin = require('../');

pluginTester({
  plugin,
  pluginName: 'transform SX Tailwind',
  snapshot: true,
  tests: fixturesFiles.map((fixtureFile) => {
    return {
      title: fixtureFile,
      fixture: path.join(fixturesPath, fixtureFile),
      pluginOptions: getPluginOptions(fixtureFile),
    };
  }),
  babelOptions: {
    plugins: [
      '@babel/plugin-syntax-flow', //
      '@babel/plugin-syntax-jsx',
    ],
  },
});
