// @flow

const path = require('path');
const chalk = require('chalk');
const { codeFrameColumns } = require('@babel/code-frame');

/*::

// https://eslint.org/docs/developer-guide/nodejs-api#-lintresult-type
export type Results = $ReadOnlyArray<{
  +filePath: string,
  +messages: $ReadOnlyArray<{
    +ruleId: string | null,
    +severity: 1 | 2,
    +message: string,
    +line?: number,
    +column?: number,
    +endLine?: number,
    +endColumn?: number,
    +fatal?: boolean,
    ...
  }>,
  +fixableErrorCount: number,
  +fixableWarningCount: number,
  +errorCount: number,
  +warningCount: number,
  +output?: string,
  +source: string,
  ...
}>

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
  const ruleId =
    message.fatal === true || message.ruleId == null ? '' : chalk.dim(`(${message.ruleId})`);
  const filePath = formatFilePath(parentResult.filePath, message.line, message.column);
  const sourceCode = parentResult.output != null ? parentResult.output : parentResult.source;

  const firstLine = [`${type}`, ruleId ? `${ruleId}` : '', `at ${filePath}`]
    .filter(String)
    .join(' ');

  const result = [firstLine];

  if (sourceCode) {
    const location = {
      start: { line: message.line, column: message.column },
      end: undefined,
    };
    if (message.endLine != null && message.endColumn != null) {
      location.end = { line: message.endLine, column: message.endColumn };
    }
    result.push(
      codeFrameColumns(sourceCode, location, {
        highlightCode: true,
        ...options,
        message: msg,
      }),
    );
  }

  return result.join('\n');
}

module.exports = function (results /*: Results */, options /*: ?Options */) /*: string */ {
  let errors = 0;
  let warnings = 0;

  const resultsWithMessages = results.filter((result) => result.messages.length > 0);

  const outputWarnings = resultsWithMessages.reduce((resultsOutput, result) => {
    const messages = result.messages
      .filter((message) => message.severity === 1) // warnings
      .map((message) => `${formatMessage(message, result, options)}\n\n`);

    warnings += result.warningCount;
    return resultsOutput.concat(messages);
  }, []);

  const outputErrors = resultsWithMessages.reduce((resultsOutput, result) => {
    const messages = result.messages
      .filter((message) => message.severity === 2) // errors
      .map((message) => `${formatMessage(message, result, options)}\n\n`);

    errors += result.errorCount;
    return resultsOutput.concat(messages);
  }, []);

  const output = outputWarnings.concat(outputErrors).join('\n');
  return errors + warnings > 0 ? output : '';
};
