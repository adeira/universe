// @flow

const path = require('path');

process.env.BROWSERSLIST = 'last 2 versions';

module.exports = {
  rootDir: __dirname,
  setupFilesAfterEnv: [(path.join(__dirname, 'scripts', 'setupTests.js') /*: string */)],
};
