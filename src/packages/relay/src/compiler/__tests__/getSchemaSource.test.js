// @flow strict

import fs from 'fs';
import path from 'path';
import { Source } from 'graphql';

import getSchemaSource from '../getSchemaSource';

const basePath = path.join(__dirname, '__fixtures__', 'schemas');
test.each(fs.readdirSync(basePath))('loads the fixture as expected', fixturePath => {
  expect.assertions(1);

  let schemaSource;
  const schemaPath = path.join(basePath, fixturePath);
  try {
    schemaSource = getSchemaSource(schemaPath);
  } catch (error) {
    expect(
      `\n${error.message.replace(schemaPath, path.relative(basePath, schemaPath))}\n`,
    ).toMatchSnapshot();
  }

  if (schemaSource) {
    expect(schemaSource instanceof Source).toBe(true);
  }
});
