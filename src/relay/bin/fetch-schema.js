#!/usr/bin/env node

// @flow

// TODO: DRY monorepo-utils/bin/monorepo-babel-node-runner.js and relay-compiler
// This is here to make this `bin` available directly from our monorepo without transpiling it.
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward-optional',
});

const fs = require('fs');
const path = require('path');
const { invariant } = require('@adeira/js');
const fetch = require('@adeira/fetch').default;
const logger = require('@adeira/logger').default;
const SignedSource = require('@adeira/signed-source').default;
const { lexicographicSortSchema } = require('graphql');
const { buildClientSchema, getIntrospectionQuery, printSchema } = require('graphql/utilities');

const { fetchSchemaOptions } = require('./commander/options');

const options = fetchSchemaOptions(process.argv);

const resource = options.resource;
invariant(resource != null, 'Option --resource is required.');

const filename = path.join(process.cwd(), options.filename);

(async () => {
  const response = await fetch(resource, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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
