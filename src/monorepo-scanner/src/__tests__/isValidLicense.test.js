// @flow

import path from 'path';
import { verifyTestsFromFixtures } from '@adeira/fixtures-tester';

import isValidLicense from '../isValidLicense';

const LICENSES_PATH = path.join(__dirname, 'fixtures', 'licenses');

verifyTestsFromFixtures(path.join(LICENSES_PATH, 'valid'), (validLicense) => {
  return isValidLicense(validLicense) === true;
});

verifyTestsFromFixtures(path.join(LICENSES_PATH, 'invalid'), (invalidLicense) => {
  return isValidLicense(invalidLicense) === false;
});
