// @flow strict

const shouldPersist = process.env.RELAY_ENABLE_PERSIST === 'true';

// RELAY_ENABLE_PERSIST=true ./node_modules/.bin/relay-compiler --repersist
const abacusPersistConfig /*: $FlowFixMe */ =
  shouldPersist === true
    ? {
        persist: {
          url: 'https://abacus.kochka.com.mx/graphql/persist',
          concurrency: 10,
          params: {},
        },
      }
    : {};

// See: https://github.com/facebook/relay/tree/main/packages/relay-compiler#configuration
module.exports = {
  root: '.',
  sources: {
    'src/abacus-backoffice': 'abacus',
    'src/abacus-kochka': 'abacus',
  },
  excludes: ['**/__flowtests__/**'],
  codegenCommand: './x relay',
  projects: {
    abacus: {
      language: 'flow',
      schema: 'src/abacus/schema.graphql',
      // Require all GraphQL scalar types mapping to be defined, will throw if a GraphQL scalar
      // type doesn't have a JS type.
      requireCustomScalarTypes: true,
      // A map from GraphQL scalar types to a custom JS type, example:
      // { "Url": "string" }
      customScalarTypes: {
        ProductImageUploadable: 'string',
      },
      // Optional regex to restrict `@relay_test_operation` directive to directories matching this
      // regex (so it cannot be used in production code by accident).
      testPathRegex: '__tests__',
      featureFlags: {
        compact_query_text: { kind: 'enabled' },
        no_inline: { kind: 'enabled' },
      },
      flowTypegen: {
        // Enable to remove "%future added value" from enum types (not recommended):
        no_future_proof_enums: false,
      },
      schemaConfig: {
        // Name of the globally unique ID field on the `Node` interface.
        nodeInterfaceIdField: 'id',
        // Restricts the type of all fields named `id` to `ID`.
        // Learn why: https://github.com/facebook/relay/commit/d0a39283d45854922119b779c4ac7014fd402d20
        nonNodeIdFields: {},
      },
      ...abacusPersistConfig,
    },
  },
  isDevVariableName: '__DEV__',
};
