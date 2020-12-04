// @flow

import path from 'path';
import testFixtures from '@adeira/eslint-fixtures-tester';

const fixturesPath = path.join(__dirname, 'fixtures', 'valid-usage');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../valid-usage'),
  validFixturesPath,
  invalidFixturesPath,
});
