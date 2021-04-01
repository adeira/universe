// @flow strict

module.exports = {
  root: '.',
  sources: {
    'src/abacus-backoffice': 'abacus',
    'src/abacus-kochka': 'abacus',
    'src/example-relay': 'example-relay',
  },
  excludes: ['**/__flowtests__/**'],
  codegenCommand: './node_modules/.bin/relay-compiler',
  projects: {
    'abacus': {
      language: 'flow',
      flowEnums: [
        // TODO: doesn't work (https://github.com/facebook/relay/issues/3596#issuecomment-1003148218)
        'SupportedCurrency',
        'SupportedLocale',
      ],
      flowTypegen: {
        phase: 'Compat', // TODO: "Final"
      },
      schema: 'src/abacus/schema.graphql',
      customScalarTypes: {
        ProductImageUploadable: 'string',
      },
      testPathRegex: '__tests__',
      featureFlags: {
        no_inline: { kind: 'enabled' },
      },
    },
    'example-relay': {
      language: 'flow',
      flowTypegen: {
        phase: 'Compat', // TODO: "Final"
      },
      schema: 'src/example-relay/schema.graphql',
      schemaExtensions: ['src/example-relay/src/LocalForm'],
    },
  },
  isDevVariableName: '__DEV__',
};
