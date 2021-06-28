// @flow

import path from 'path';
import testFixtures from '@adeira/eslint-fixtures-tester';

const fixturesPath = path.join(__dirname, 'fixtures', 'use-logical-properties');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../use-logical-properties'),
  validFixturesPath,
  invalidFixturesPath,
});
