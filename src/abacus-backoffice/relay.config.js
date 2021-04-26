// @flow strict

module.exports = {
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './',
  include: ['**/pages/**', '**/src/**'],
  schema: '../abacus/schema.graphql',
  customScalars: {
    ProductImageUploadable: 'String',
  },
};
