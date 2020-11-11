// @flow

import path from 'path';

import testFixtures from './testFixtures';

const fixturesPath = path.join(__dirname, 'fixtures', 'no-concatenated-classes');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../no-concatenated-classes'),
  validFixturesPath,
  invalidFixturesPath,
});
