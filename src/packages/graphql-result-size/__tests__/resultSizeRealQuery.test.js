// @flow

import fs from 'fs';
import path from 'path';
import { parse, buildSchema } from 'graphql';
import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import calculate from '../calculate';

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, 'testschema-real.graphql'), 'utf8'),
);

generateTestsFromFixtures(path.join(__dirname, '__fixtures__'), input => {
  return calculate(schema, parse(input));
});
