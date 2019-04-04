// @flow

import fs from 'fs';
import path from 'path';

import parsePatch from '../parsePatch';

const FIXTURES_PATH = path.join(__dirname, 'fixtures');
fs.readdirSync(FIXTURES_PATH).forEach(fixtureFile => {
  it(`parses correctly fixture: ${fixtureFile}`, () => {
    const hunks = [];
    for (const hunk of parsePatch(
      fs.readFileSync(path.join(FIXTURES_PATH, fixtureFile), {
        encoding: 'utf8',
      }),
    )) {
      hunks.push(hunk);
    }
    expect(hunks).toMatchSnapshot();
  });
});
