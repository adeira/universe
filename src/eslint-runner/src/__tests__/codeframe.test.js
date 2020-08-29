// @flow

import fs from 'fs';
import stripAnsi from 'strip-ansi';

import codeframe from '../codeframe';

const results = [
  {
    filePath: 'src/test.js',
    messages: [
      {
        ruleId: 'rule-id-111',
        severity: 1,
        message: 'Some Eslint warning message.',
        line: 16,
        column: 9,
        nodeType: 'mock',
        messageId: 'mock',
        endLine: 17,
        endColumn: 14,
      },
      {
        ruleId: 'rule-id-222',
        severity: 2,
        message: 'Some Eslint error message.',
        line: 16,
        column: 9,
        nodeType: 'mock',
        messageId: 'mock',
        endLine: 17,
        endColumn: 14,
      },
    ],
    errorCount: 0,
    warningCount: 2,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    source: fs.readFileSync(__filename, 'utf8'),
  },
];

it('prints the error as expected', () => {
  expect(stripAnsi(codeframe(results, { highlightCode: false }))).toMatchInlineSnapshot(`
    "TODO (rule-id-111) at src/test.js:16:9
      14 |         severity: 1,
      15 |         message: 'Some Eslint warning message.',
    > 16 |         line: 16,
         |         ^^^^^^^^^
    > 17 |         column: 9,
         | ^^^^^^^^^^^^^^ Some Eslint warning message
      18 |         nodeType: 'mock',
      19 |         messageId: 'mock',
      20 |         endLine: 17,


    ERROR (rule-id-222) at src/test.js:16:9
      14 |         severity: 1,
      15 |         message: 'Some Eslint warning message.',
    > 16 |         line: 16,
         |         ^^^^^^^^^
    > 17 |         column: 9,
         | ^^^^^^^^^^^^^^ Some Eslint error message
      18 |         nodeType: 'mock',
      19 |         messageId: 'mock',
      20 |         endLine: 17,

    "
  `);
});
