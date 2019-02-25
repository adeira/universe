/* eslint-disable no-console */
// @flow

import os from 'os';
import chalk from 'chalk';

const _eol = (message: string) => os.EOL + message + os.EOL;

const note = (message: string) => {
  console.log(_eol(message));
};

const success = (message: string) => {
  console.log(_eol(chalk.green.bold(message)));
};

const warning = (message: string) => {
  console.log(_eol(chalk.yellow.bold(message)));
};

const error = (message: string) => {
  console.log(_eol(chalk.red.bold(message)));
};

const printBreakingChanges = (changes: $ReadOnlyArray<Object>) => {
  console.error(
    chalk.red(
      'You introduced breaking changes into the public GraphQL schema. ',
    ) +
      'This change may or may not be intentional. These breaking changes ' +
      'may break some clients consuming our public API. Please try to ' +
      'find a way how to avoid breaking changes and try it again. Here is ' +
      'list of all breaking changes:' +
      os.EOL,
  );

  for (const change of changes) {
    console.error(chalk.red.bold(change.type) + ' - ' + change.description);
  }

  note(
    `\nTips how to avoid breaking changes:

- field removal/modification (introduce new field and only deprecate the old one)
- type removal/modification (just deprecate it and leave it there)
- removal from enum/union (introduce new enum/union)
- arguments removal/modification (introduce new query or graph node)
- change non-nullable -> nullable (just don't do it or introduce new field)
- change of default argument value (don't or introduce new argument/query)
`,
  );
};

const printDangerousChanges = (changes: $ReadOnlyArray<Object>) => {
  for (const change of changes) {
    console.warn(chalk.yellow.bold(change.type) + ' - ' + change.description);
  }
};

export {
  printBreakingChanges,
  printDangerousChanges,
  note,
  success,
  warning,
  error,
};
