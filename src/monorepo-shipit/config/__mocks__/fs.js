// @flow

const fs: any = jest.createMockFromModule('fs');

fs.existsSync = (path) => path !== '/unknown_path';

export default fs;
