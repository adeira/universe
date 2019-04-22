// @flow strict

const fs = jest.genMockFromModule('fs');

fs.existsSync = path => path !== '/unknown_path';

export default fs;
