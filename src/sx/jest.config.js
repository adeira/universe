// @flow

const path = require('path');

module.exports = {
  rootDir: __dirname,
  setupFilesAfterEnv: [(path.join(__dirname, 'scripts', 'setupTests.js') /*: string */)],
};
