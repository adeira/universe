#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js and relay-compiler
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@kiwicom)/],
  rootMode: 'upward',
});

const fs = require('fs');
const path = require('path');
const program = require('commander');
const fetch = require('@kiwicom/fetch').default;
const logger = require('@kiwicom/logger').default;
const SignedSource = require('@kiwicom/signed-source').default;
const { lexicographicSortSchema } = require('graphql');
const { buildClientSchema, getIntrospectionQuery, printSchema } = require('graphql/utilities');

program
  .option('--resource <url>', undefined, 'https://graphql.kiwi.com/')
  .option('--filename <path>', undefined, 'schema.graphql')
  .parse(process.argv);

const filename = path.join(process.cwd(), program.filename);

(async () => {
  const response = await fetch(program.resource, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Client': '@kiwicom/relay schema fetcher',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  });

  const schemaJSON = await response.json();
  const clientSchema = printSchema(lexicographicSortSchema(buildClientSchema(schemaJSON.data)));
  const schema = SignedSource.signFile(`# ${SignedSource.getSigningToken()}

${clientSchema}
`);
  fs.writeFileSync(filename, schema);
  logger.log('GraphQL schema saved to: %s', filename);
})();
