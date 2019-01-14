// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';
import * as babel from '@babel/core';

function transform(input) {
  const oldEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';

  const transformedCode = babel.transform(input, {
    presets: [require('../index')],
  }).code;

  process.env.NODE_ENV = oldEnv;
  return transformedCode;
}

generateTestsFromFixtures(`${__dirname}/__fixtures__`, transform);
