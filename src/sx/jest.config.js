// @flow strict

const path = require('path');

const setupFilesAfterEnv /*: string */ = path.join(__dirname, 'scripts', 'setupTests.js');

module.exports = {
  rootDir: __dirname,
  setupFilesAfterEnv: [setupFilesAfterEnv],
};
