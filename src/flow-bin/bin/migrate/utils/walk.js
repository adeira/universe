// @flow strict

import fs from 'fs';
import path from 'path';

// This is synchronous because we have to always visit one file, try to change it and move on consecutively.
// This is true only for `strict-lint` project so we could improve.
export default function walk(dir: string, cb: (string) => void) {
  if (dir.endsWith('node_modules')) {
    return;
  }
  const list = fs.readdirSync(dir);
  list.forEach(function (filename) {
    const file = dir + path.sep + filename;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      walk(file, cb);
    } else if (file.endsWith('.js')) {
      cb(file);
    }
  });
}
