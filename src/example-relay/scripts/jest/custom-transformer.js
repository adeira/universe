// @flow

const path = require('path');
const babelJest = require('babel-jest');

// https://github.com/facebook/jest/issues/11444#issuecomment-847909076
module.exports = (babelJest.default.createTransformer(
  require(path.join(__dirname, '..', '..', '.babelrc.js')),
) /*: any */);
