// @flow strict

import fs from 'fs';
import path from 'path';
import { GraphQLSchema } from 'graphql';

import getSchema from '../getSchema';

const basePath = path.join(__dirname, '__fixtures__', 'schemas');
test.each(fs.readdirSync(basePath))('loads the fixture as expected', fixturePath => {
  expect.hasAssertions();
  let schema;
  const schemaPath = path.join(basePath, fixturePath);
  try {
    schema = getSchema(schemaPath);
    expect(schema instanceof GraphQLSchema).toBe(true);
  } catch (error) {
    expect(
      `\n${error.message.replace(schemaPath, path.relative(basePath, schemaPath))}\n`,
    ).toMatchSnapshot();
  }
});
