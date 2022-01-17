// @flow

import getOutputForFixture from './getOutputForFixture';

export default function verifyTestsFromFixtures( // eslint-disable-line jest/no-export
  fixturesPath: string,
  operation: (input: string) => boolean,
): void {
  const fs = require('fs');
  const path = require('path');

  const fixtures = fs.readdirSync(fixturesPath);

  test(`has fixtures in ${fixturesPath}`, () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });

  const isFile = (f) => fs.lstatSync(path.join(fixturesPath, f)).isFile();
  test.each(fixtures.filter(isFile))('results in true value: %s', async (file) => {
    const input = fs.readFileSync(path.join(fixturesPath, file), 'utf8');
    const output = await getOutputForFixture(input, operation, file);
    expect(output).toBe(true);
  });
}
