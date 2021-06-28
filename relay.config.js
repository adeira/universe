// @flow strict

module.exports = {
  root: '.',
  sources: {
    'src/abacus-backoffice': 'abacus',
    'src/abacus-kochka': 'abacus',
    'src/example-relay': 'example-relay',
    'src/relay': 'relay',
  },
  excludes: ['**/__flowtests__/**'],
  codegenCommand: './node_modules/.bin/relay-compiler-experimental',
  projects: {
    'abacus': {
      schema: 'src/abacus/schema.graphql',
      customScalarTypes: {
        ProductImageUploadable: 'String',
      },
      jsModuleFormat: 'commonjs',
    },
    'example-relay': {
      schema: 'src/example-relay/schema.graphql',
      extensions: ['src/example-relay/src/LocalForm'],
      jsModuleFormat: 'commonjs',
    },
    'relay': {
      schema: 'src/relay/schema.graphql',
      jsModuleFormat: 'commonjs',
    },
  },
  isDevVariableName: '__DEV__',
};
