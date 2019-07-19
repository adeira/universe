#!/usr/bin/env node

// @flow

const fs = require('fs');
const path = require('path');
const program = require('commander');
const fetch = require('@kiwicom/fetch').default;
const logger = require('@kiwicom/logger').default;
const { buildClientSchema, getIntrospectionQuery, printSchema } = require('graphql/utilities');

program
  .option('--resource <url>', undefined, 'https://graphql.kiwi.com/')
  .option('--filename <path>', undefined, path.join(process.cwd(), 'schema.graphql'))
  .parse(process.argv);

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
  const clientSchema = await printSchema(buildClientSchema(schemaJSON.data));
  fs.writeFileSync(program.filename, clientSchema);

  logger.log('GraphQL schema saved to: %s', program.filename);
})();
