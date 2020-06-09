// @flow strict

const fs = jest.createMockFromModule('fs');

fs.existsSync = (path) => path !== '/unknown_path';

export default fs;
