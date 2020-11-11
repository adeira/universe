// @flow

import path from 'path';

import testFixtures from './testFixtures';

const fixturesPath = path.join(__dirname, 'fixtures', 'no-unused-stylesheet');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../no-unused-stylesheet'),
  validFixturesPath,
  invalidFixturesPath,
});
