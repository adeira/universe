// @flow

// $FlowIssue[prop-missing]: https://github.com/flow-typed/flow-typed/pull/4062
const fs: any = jest.createMockFromModule('fs');

fs.existsSync = (path) => path !== '/unknown_path';

export default fs;
