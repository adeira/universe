// @flow

import path from 'path';

import verifyTestsFromFixtures from '../verifyTestsFromFixtures';

verifyTestsFromFixtures(
  path.join(__dirname, `/fixtures/simple`),
  (input) => typeof input === 'string',
);
