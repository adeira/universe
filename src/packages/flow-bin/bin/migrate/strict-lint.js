// @flow

/* eslint-disable no-console */

import fs from 'fs';
import { ShellCommand } from '@kiwicom/monorepo-utils';

import walk from './utils/walk';

export default function strictLint(flowPath: string, strictLintPath: string) {
  walk(strictLintPath, file => {
    const flowHeader = /^\/\/ @flow$/m;

    const fileContent = fs.readFileSync(file, 'utf8');
    if (!flowHeader.test(fileContent)) {
      console.log('🔷 %s', file); // nothing to do here
      return;
    }
    const newFileContent = fileContent.replace(flowHeader, '// @flow strict');
    fs.writeFileSync(file, newFileContent);

    const stdout = new ShellCommand(null, flowPath, 'status', '--json')
      .setNoExceptions()
      .runSynchronously()
      .getStdout();
    const passed = JSON.parse(stdout).passed === true;

    if (passed) {
      console.log('✅ %s', file);
    } else {
      console.warn('❌ %s', file);
      const fileContent = fs.readFileSync(file, 'utf8');
      const newFileContent = fileContent.replace(/^\/\/ @flow strict$/m, '// @flow');
      fs.writeFileSync(file, newFileContent);
    }
  });
}
