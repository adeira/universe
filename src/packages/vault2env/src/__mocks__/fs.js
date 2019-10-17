// @flow

const fs: any = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);
fs.__setMockFiles = function(newMockFiles) {
  mockFiles = newMockFiles;
};

fs.existsSync = function(filePath) {
  return mockFiles[filePath] !== undefined;
};

fs.writeFileSync = function(filePath, content) {
  mockFiles[filePath] = content;
};

fs.readFileSync = function(filePath) {
  return mockFiles[filePath];
};

module.exports = fs;
