// @flow

import fs from 'fs';
import path from 'path';
import flowConfigParser from 'flow-config-parser';

const PROJECT_ROOT = path.join(__dirname, '..', '..'); // use monorepo utils (?)
const flowConfig = flowConfigParser(
  fs.readFileSync(path.join(PROJECT_ROOT, '.flowconfig'), 'utf-8'),
);

it('uses valid well_formed_exports.includes paths', () => {
  expect.hasAssertions();

  for (const [optionName, optionValue] of flowConfig.options) {
    if (optionName === 'well_formed_exports.includes') {
      const path = optionValue.replace(/<PROJECT_ROOT>/, PROJECT_ROOT);
      expect({ exists: fs.existsSync(path), path }).toEqual({ exists: true, path });
    }
  }
});
