// @flow strict-local

import path from 'path';
import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import parsePatch from '../parsePatch';

generateTestsFromFixtures(path.join(__dirname, 'fixtures', 'diffs'), operation);

function operation(input) {
  return new Promise(resolve => {
    const hunks = [];
    for (const hunk of parsePatch(input)) {
      hunks.push(hunk);
    }
    resolve(hunks);
  });
}
