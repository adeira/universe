// @flow strict

/* eslint-disable no-console */

import os from 'os';
import chalk from 'chalk';
/* $FlowFixMe[untyped-type-import] This comment suppresses an error when
 * upgrading GraphQL to version 16.x. To see the error delete this comment and
 * run Flow. */
import type { BreakingChange, DangerousChange } from 'graphql';

const note = (message: string): void => {
  console.log(message);
};

const success = (message: string): void => {
  console.log(chalk.green.bold(message));
};

const warning = (message: string): void => {
  console.log(chalk.yellow.bold(message));
};

const error = (message: string): void => {
  console.log(chalk.red.bold(message));
};

/* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
 * GraphQL to version 16.x. To see the error delete this comment and run Flow.
 */
const printBreakingChanges = (changes: $ReadOnlyArray<BreakingChange>): void => {
  console.error(
    `${chalk.red(
      'You introduced breaking changes into the public GraphQL schema. ',
    )}This change may or may not be intentional. These breaking changes ` +
      `may break some clients consuming our public API. Please try to ` +
      `find a way how to avoid breaking changes and try it again. Here is ` +
      `list of all breaking changes:${os.EOL}`,
  );

  for (const change of changes) {
    console.error(`${chalk.red.bold(change.type)} - ${change.description}`);
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

/* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
 * GraphQL to version 16.x. To see the error delete this comment and run Flow.
 */
const printDangerousChanges = (changes: $ReadOnlyArray<DangerousChange>): void => {
  for (const change of changes) {
    console.warn(`${chalk.yellow.bold(change.type)} - ${change.description}`);
  }
};

export { printBreakingChanges, printDangerousChanges, note, success, warning, error };
