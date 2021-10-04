// @flow strict

const path = require('path');

module.exports = {
  rootDir: __dirname,
  setupFilesAfterEnv: [(path.join(__dirname, 'jest-setup.js') /*: string */)],
};
