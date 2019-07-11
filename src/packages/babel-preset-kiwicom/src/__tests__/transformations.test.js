// @flow

import * as babel from '@babel/core';
import { generateTestsFromFixtures } from '@kiwicom/test-utils';
import stripAnsi from 'strip-ansi';

function transform(target) {
  return input => {
    try {
      const oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const transformedCode = babel.transform(input, {
        root: __dirname,
        rootMode: 'root',
        presets:
          target === 'js'
            ? ['@kiwicom/babel-preset-kiwicom'] // keep it here to test the defaults
            : [['@kiwicom/babel-preset-kiwicom', { target }]], // for any other target
      }).code;

      process.env.NODE_ENV = oldEnv;

      // TODO: it would be great to have the possibility to evaluate some
      //  transpiled codes and check if they work as expected.

      return transformedCode;
    } catch (error) {
      throw new Error(stripAnsi(error.message));
    }
  };
}

['babel-issues', 'features'].forEach(group => {
  generateTestsFromFixtures(`${__dirname}/__fixtures__/${group}`, transform('js'));
  generateTestsFromFixtures(`${__dirname}/__fixtures__/${group}`, transform('flow'));
  generateTestsFromFixtures(`${__dirname}/__fixtures__/${group}`, transform('js-esm'));
});
