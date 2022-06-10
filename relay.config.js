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
        no_inline: { kind: 'enabled' },
      },
      ...abacusPersistConfig,
    },
  },
  isDevVariableName: '__DEV__',
};
