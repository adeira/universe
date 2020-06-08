// @flow strict

import fs from 'fs';
import path from 'path';

import isValidLicense from '../isValidLicense';

const fixturesPath = path.join(__dirname, 'fixtures', 'licenses');

const validFixturesPath = path.join(fixturesPath, 'valid');
test.each(fs.readdirSync(validFixturesPath))('%s is valid', file => {
  const license = fs.readFileSync(path.join(validFixturesPath, file), 'utf8');
  expect(isValidLicense(license)).toBe(true);
});

const invalidFixturesPath = path.join(fixturesPath, 'invalid');
test.each(fs.readdirSync(invalidFixturesPath))('%s is not valid', file => {
  const license = fs.readFileSync(path.join(invalidFixturesPath, file), 'utf8');
  expect(isValidLicense(license)).toBe(false);
});
