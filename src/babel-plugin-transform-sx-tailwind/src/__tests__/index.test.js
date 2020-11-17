// @flow

import fs from 'fs';
import path from 'path';
import pluginTester from 'babel-plugin-tester';
import serializer from 'jest-serializer-path';

import getPluginOptions from './options';

expect.addSnapshotSerializer(serializer);

const plugin = require('../');

const fixtures = loadFixtures(path.join(__dirname, 'fixtures'));
const invalidFixtures = loadFixtures(path.join(__dirname, 'fixtures/error'), { error: Error });

pluginTester({
  plugin,
  pluginName: 'transform SX Tailwind',
  snapshot: true,
  tests: [...fixtures, ...invalidFixtures],
  babelOptions: {
    plugins: [
      '@babel/plugin-syntax-flow',
      '@babel/plugin-syntax-jsx',
      '@babel/plugin-transform-regenerator',
    ],
  },
});

function loadFixtures(fixturesPath, options = {}) {
  return fs
    .readdirSync(fixturesPath)
    .filter((f) => fs.statSync(path.join(fixturesPath, f)).isFile())
    .map((fixtureFile) => ({
      title: fixtureFile,
      fixture: path.join(fixturesPath, fixtureFile),
      pluginOptions: getPluginOptions(fixtureFile),
      ...options,
    }));
}
