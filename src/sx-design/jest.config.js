// @flow strict

const path = require('path');

const setupFilesAfterEnv /*: string */ = path.join(__dirname, 'jest-setup.js');

module.exports = {
  rootDir: __dirname,
  setupFilesAfterEnv: [setupFilesAfterEnv],
};
