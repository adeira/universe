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
  // TODO: these queries mostly do not work since we do not support fragments yet
  return calculate(schema, parse(input));
});
