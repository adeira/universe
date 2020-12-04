// @flow

import path from 'path';
import testFixtures from '@adeira/eslint-fixtures-tester';

const fixturesPath = path.join(__dirname, 'fixtures', 'no-unmasked-graphql-id-without-alias');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../no-unmasked-graphql-id-without-alias'),
  validFixturesPath,
  invalidFixturesPath,
});
