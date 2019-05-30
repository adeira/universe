// @flow

const { FlowGenerator } = require('relay-compiler');
const { find } = require('relay-compiler/lib/FindGraphQLTags'); // TODO: better (?)

const formatGeneratedModule = require('./formatGeneratedModule');

module.exports = () => ({
  inputExtensions: ['js', 'jsx'],
  outputExtension: 'js',
  typeGenerator: FlowGenerator,
  formatModule: formatGeneratedModule,
  findGraphQLTags: find,
});
