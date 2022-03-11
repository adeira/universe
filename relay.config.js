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
    'src/example-relay': 'example-relay',
  },
  excludes: ['**/__flowtests__/**'],
  codegenCommand: './x relay',
  projects: {
    'abacus': {
      language: 'flow',
      flowEnums: [
        // TODO: doesn't work (https://github.com/facebook/relay/issues/3596#issuecomment-1003148218)
        'SupportedCurrency',
        'SupportedLocale',
      ],
      flowTypegen: {
        phase: 'Final',
      },
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
    'example-relay': {
      language: 'flow',
      flowTypegen: {
        phase: 'Final',
      },
      schema: 'src/example-relay/schema.graphql',
      schemaExtensions: ['src/example-relay/src/schemaExtensions'],
      // Optional regex to restrict `@relay_test_operation` directive to directories matching this
      // regex (so it cannot be used in production code by accident).
      testPathRegex: '__tests__',
    },
  },
  isDevVariableName: '__DEV__',
};
