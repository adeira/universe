// @flow
/* eslint-disable */

import {
  findBreakingChanges,
  buildClientSchema,
  introspectionQuery,
  graphql,
} from 'graphql';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

import schema from '../src/Schema.js';

const snapshotLocation = path.join(
  __dirname,
  '.',
  'graphql-schema-snapshot.json',
);
// $FlowExpectedError - the parameter passed to require() must be a literal string
const oldSchema = buildClientSchema(require(snapshotLocation));
const newSchema = schema;

const printChanges = (changes: Object[]) => {
  console.error('');
  for (const change of changes) {
    console.error(chalk.red.bold(change.type) + ' - ' + change.description);
  }
  console.error('');
};

(async () => {
  let changes = findBreakingChanges(oldSchema, newSchema);
  if (changes.length > 0) {
    console.error(
      chalk.red(
        'You introduced breaking changes into the public GraphQL schema. ',
      ) +
        'This change may or may not be intentional. These breaking changes ' +
        'may break some clients consuming our public API. Please try to ' +
        'find a way how to avoid breaking changes and try it again. Here is ' +
        'list of all breaking changes:',
    );
    printChanges(changes);
    console.error(
      `Tips how to avoid breaking changes:

- field removal/modification (introduce new field and only deprecate the old one)
- type removal/modification (just deprecate it and leave it there)
- removal from enum/union (introduce new enum/union)
- arguments removal/modification (introduce new query or graph node)
- change non-nullable -> nullable (just don't do it or introduce new field)
- change of default argument value (don't or introduce new argument/query)
`,
    );
    process.exit(1);
  }

  changes = findBreakingChanges(newSchema, oldSchema);
  if (changes.length > 0) {
    console.warn(
      chalk.yellow.bold(
        `\nGraphQL schema snapshot IS OUTDATED! (updating automatically)`,
      ),
    );
    const meta = await graphql(schema, introspectionQuery);
    fs.writeFileSync(snapshotLocation, JSON.stringify(meta.data, null, 2));
    console.log(
      'Snapshot of the GraphQL schema successfully created! Now please commit it...\n',
    );
    process.exit(1); // this is also considered failure so CI will fail (must be committed manually)
  } else {
    console.log(
      chalk.green.bold(
        '\nCongratulations! NO BREAKING CHANGES or OUTDATED SCHEMA. Good job!\n',
      ),
    );
  }
})();
