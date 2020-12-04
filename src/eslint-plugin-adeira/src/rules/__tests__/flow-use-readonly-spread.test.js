// @flow

import path from 'path';
import testFixtures from '@adeira/eslint-fixtures-tester';

const fixturesPath = path.join(__dirname, 'fixtures', 'flow-use-readonly-spread');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../flow-use-readonly-spread'),
  validFixturesPath,
  invalidFixturesPath,
});
