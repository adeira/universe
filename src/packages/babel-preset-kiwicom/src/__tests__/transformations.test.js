// @flow

import * as babel from '@babel/core';
import { generateTestsFromFixtures } from '@kiwicom/test-utils';

function transform(target) {
  return input => {
    const oldEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const transformedCode = babel.transform(input, {
      presets:
        target === 'js'
          ? ['@kiwicom/babel-preset-kiwicom'] // keep it here to test the defaults
          : [['@kiwicom/babel-preset-kiwicom', { target }]], // for any other target
    }).code;

    process.env.NODE_ENV = oldEnv;
    return transformedCode;
  };
}

generateTestsFromFixtures(`${__dirname}/__fixtures__`, transform('js'));
generateTestsFromFixtures(`${__dirname}/__fixtures__`, transform('flow'));
