// @flow

const os = require('os');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');

function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

/*::

type Results = $ReadOnlyArray<{|
  +messages: $ReadOnlyArray<{|
    +fatal: boolean,
    +severity: number,
    +line: number,
    +column: number,
    +message: string,
    +ruleId: string,
  |}>,
  +errorCount: number,
  +warningCount: number,
  +fixableErrorCount: number,
  +fixableWarningCount: number,
|}>

*/

module.exports = function(results /*: Results */) /*: string */ {
  let output = os.EOL;
  let errorCount = 0;
  let warningCount = 0;
  let fixableErrorCount = 0;
  let fixableWarningCount = 0;
  let summaryColor = 'yellow';

  results.forEach(result => {
    const messages = result.messages;

    if (messages.length === 0) {
      return;
    }

    errorCount += result.errorCount;
    warningCount += result.warningCount;
    fixableErrorCount += result.fixableErrorCount;
    fixableWarningCount += result.fixableWarningCount;

    output +=
      table(
        messages.map(message => {
          let messageType;
          if (message.fatal || message.severity === 2) {
            messageType = chalk.red('error');
            summaryColor = 'red';
          } else {
            messageType = chalk.yellow('warning');
          }
          return [
            '',
            message.line || 0,
            message.column || 0,
            messageType,
            message.message.replace(/(?<msg>[^ ])\.$/, '$1'),
            chalk.dim(message.ruleId || ''),
          ];
        }),
        {
          align: ['', 'r', 'l'],
          stringLength(str) {
            return stripAnsi(str).length;
          },
        },
      )
        .split(os.EOL)
        .map(el =>
          el.replace(/(?<line>\d+)\s+(?<column>\d+)/, (m, p1, p2) => chalk.dim(`${p1}:${p2}`)),
        )
        .join(os.EOL) + os.EOL;
  });

  const total = errorCount + warningCount;

  if (total > 0) {
    if (fixableErrorCount > 0 || fixableWarningCount > 0) {
      output +=
        os.EOL +
        // $FlowExpectedError: indexer property is missing in Chalk (problem of Chalk)
        chalk[summaryColor].bold(
          [
            '  ',
            fixableErrorCount,
            pluralize(' error', fixableErrorCount),
            ' and ',
            fixableWarningCount,
            pluralize(' warning', fixableWarningCount),
            ' potentially fixable with the `--fix` option.\n',
          ].join(''),
        );
    }
  }

  return total > 0 ? output : '';
};
