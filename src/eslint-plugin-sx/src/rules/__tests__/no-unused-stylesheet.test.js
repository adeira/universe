// @flow

import path from 'path';
import { RuleTester } from 'eslint';
import { codeFrameColumns } from '@babel/code-frame';
import testFixtures from '@adeira/eslint-fixtures-tester';

import normalizeIndent from './normalizeIndent';

const fixturesPath = path.join(__dirname, 'fixtures', 'no-unused-stylesheet');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

const rule = require('../no-unused-stylesheet');

testFixtures({
  rule,
  validFixturesPath,
  invalidFixturesPath,
});

const ruleTester = new RuleTester({
  parser: require.resolve('hermes-eslint'),
});

// This test makes sure we are reporting correct lines and columns:
const invalidTests = [
  {
    code: normalizeIndent`
      import sx from '@adeira/sx';
      const styles = sx.create({
        aaa: {
          color: blue,
        }
      });
    `,
    errors: [
      {
        message: 'SX function "styles" was not used anywhere in the code.',
        line: 3,
        column: 7,
        endLine: 7,
        endColumn: 3,
      },
      {
        message: 'Unused stylesheet: aaa (defined via "styles" variable)',
        line: 4,
        column: 3,
        endLine: 6,
        endColumn: 4,
      },
    ],
  },
  {
    code: normalizeIndent`
      import sx from '@adeira/sx';
      export default function TestComponent() {
        return <div className={styles('bbb')} />
      }
      const styles = sx.create({
        aaa: { color: blue }
      });
    `,
    errors: [
      {
        message: 'Unknown stylesheet used: bbb (not defined anywhere)',
        line: 4,
        column: 33,
        endLine: 4,
        endColumn: 38,
      },
      {
        message: 'Unused stylesheet: aaa (defined via "styles" variable)',
        line: 7,
        column: 3,
        endLine: 7,
        endColumn: 23,
      },
    ],
  },
];

ruleTester.run('no-unused-stylesheet', rule, {
  valid: [],
  invalid: invalidTests,
});

test.each(invalidTests)('reports correct lines and columns', (test) => {
  for (const error of test.errors) {
    expect(
      codeFrameColumns(test.code, {
        start: { line: error.line, column: error.column },
        end: { line: error.endLine, column: error.endColumn },
      }),
    ).toMatchSnapshot(error.message);
  }
});
