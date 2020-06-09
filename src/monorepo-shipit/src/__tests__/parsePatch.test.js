// @flow strict-local

import path from 'path';
import { generateTestsFromFixtures } from '@adeira/test-utils';

import parsePatch from '../parsePatch';

generateTestsFromFixtures(path.join(__dirname, 'fixtures', 'diffs'), operation);

function operation(input) {
  return new Promise((resolve) => {
    let hunks = '';
    let hunkNumber = 1;
    let hunkSeparator = '';
    for (const hunk of parsePatch(input)) {
      hunks += `${hunkSeparator}~~~ HUNK ${hunkNumber++}:\n\n${hunk}`;
      hunkSeparator = '\n';
    }
    resolve(hunks);
  });
}
