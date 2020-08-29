// @flow

const path = require('path');
const chalk = require('chalk');
const { codeFrameColumns } = require('@babel/code-frame');

/*::

type Results = $ReadOnlyArray<{|
  +filePath: string,
  +messages: $ReadOnlyArray<{|
    +ruleId: string,
    +severity: number,
    +nodeType: string,
    +message: string,
    +messageId: string,
    +endLine: number,
    +endColumn: number,
    +fatal?: boolean,
    +line?: number,
    +column?: number,
  |}>,
  +errorCount: number,
  +warningCount: number,
  +fixableErrorCount: number,
  +fixableWarningCount: number,
  +source: string,
  +output?: string,
|}>

type Options = {|
  +highlightCode: boolean,
|}

*/

function formatFilePath(filePath, line, column) {
  let relPath = path.relative(process.cwd(), filePath);

  if (line != null && column != null) {
    relPath += `:${line}:${column}`;
  }

  return chalk.green(relPath);
}

function formatMessage(message, parentResult, options) {
  const type =
    message.fatal || message.severity === 2 ? chalk.red.bold('ERROR') : chalk.magenta.bold('TODO');
  const msg = `${chalk.bold(message.message.replace(/(?<msg>[^ ])\.$/u, '$1'))}`;
  const ruleId = message.fatal ? '' : chalk.dim(`(${message.ruleId})`);
  const filePath = formatFilePath(parentResult.filePath, message.line, message.column);
  const sourceCode = parentResult.output != null ? parentResult.output : parentResult.source;

  const firstLine = [`${type}`, ruleId ? `${ruleId}` : '', `at ${filePath}`]
    .filter(String)
    .join(' ');

  const result = [firstLine];

  if (sourceCode) {
    result.push(
      codeFrameColumns(
        sourceCode,
        {
          start: { line: message.line, column: message.column },
          end: { line: message.endLine, column: message.endColumn },
        },
        {
          highlightCode: true,
          ...options,
          message: msg,
        },
      ),
    );
  }

  return result.join('\n');
}

module.exports = function (results /*: Results */, options /*: ?Options */) /*: string */ {
  let errors = 0;
  let warnings = 0;

  const resultsWithMessages = results.filter((result) => result.messages.length > 0);

  const output = resultsWithMessages
    .reduce((resultsOutput, result) => {
      const messages = result.messages.map(
        (message) => `${formatMessage(message, result, options)}\n\n`,
      );

      errors += result.errorCount;
      warnings += result.warningCount;

      return resultsOutput.concat(messages);
    }, [])
    .join('\n');

  return errors + warnings > 0 ? output : '';
};
