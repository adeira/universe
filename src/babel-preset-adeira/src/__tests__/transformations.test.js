// @flow

import * as babel from '@babel/core';
import { generateTestsFromFixtures } from '@adeira/fixtures-tester';
import { findMonorepoRoot } from '@adeira/monorepo-utils';
import stripAnsi from 'strip-ansi';
import path from 'path';

function transform(target: 'js' | 'js-esm' | 'flow') {
  return (input: string) => {
    try {
      const oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const transformedCode = babel.transform(input, {
        root: __dirname,
        rootMode: 'root',
        presets:
          target === 'js'
            ? ['@adeira/babel-preset-adeira'] // keep it here to test the defaults
            : [['@adeira/babel-preset-adeira', { target }]], // for any other target
        filename: 'mockFile.js',
      }).code;

      process.env.NODE_ENV = oldEnv;

      // TODO: it would be great to have the possibility to evaluate some
      //  transpiled codes and check if they work as expected.

      return transformedCode;
    } catch (error) {
      throw new Error(
        stripAnsi(
          error.message.replace(
            path.join(findMonorepoRoot(), 'mockFile.js'),
            '/mock/path/mockFile.js',
          ),
        ),
      );
    }
  };
}

['babel-issues', 'features'].forEach((group) => {
  generateTestsFromFixtures(
    path.join(__dirname, '__fixtures__', group),
    transform('js'),
    'js (old browsers)',
  );
  generateTestsFromFixtures(path.join(__dirname, '__fixtures__', group), transform('flow'), 'flow');
  generateTestsFromFixtures(
    path.join(__dirname, '__fixtures__', group),
    transform('js-esm'),
    'js-esm (with ES6 import/export)',
  );
});
