// @flow

import fs from 'fs';
import path from 'path';
import { parse, buildSchema } from 'graphql';
import { generateTestsFromFixtures } from '@adeira/test-utils';

import { calculate } from '../calculate';

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, 'testschema-real.graphql'), 'utf8'),
);

generateTestsFromFixtures(path.join(__dirname, '__fixtures__'), input => {
  const score = calculate(schema, parse(input));
  return `✅ Score: ${score}`;
});
