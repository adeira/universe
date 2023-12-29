// @flow

import os from 'os';
import crypto from 'crypto';
import { isObject } from '@adeira/js';

import getOutputForFixture from './getOutputForFixture';

const FIXTURE_TAG = Symbol.for('FIXTURE_TAG');

/**
 * Extend Jest with a custom snapshot serializer to provide additional context
 * and reduce the amount of escaping that occurs. This serializer is heavily
 * inspired by Relay test cases.
 */
expect.addSnapshotSerializer({
  print(serializerValue) {
    return Object.keys(serializerValue)
      .map((key) => {
        const value = serializerValue[key];
        const inspectedValue = isObject(value) ? JSON.stringify(value, null, 2) : value;
        return `~~~~~~~~~~ ${key.toUpperCase()} ~~~~~~~~~~\n${inspectedValue}`;
      })
      .join(os.EOL);
  },
  test(value) {
    return value && value[FIXTURE_TAG] === true;
  },
});

type OperationOutput = any | Promise<any>;

/**
 * Generates a set of jest snapshot tests that compare the output of the
 * provided `operation` to each of the matching files in the `fixturesPath`.
 */
export default function generateTestsFromFixtures( // eslint-disable-line jest/no-export
  fixturesPath: string,
  operation: (input: string) => OperationOutput,
  customSnapshotName?: string,
): void {
  const fs = require('fs');
  const path = require('path');

  let fixtures = fs.readdirSync(fixturesPath);

  test(`has fixtures in ${fixturesPath}`, () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });

  const shouldSkip = (file: string) => /\.only\.\w+$/.test(file);
  const isFile = (f: string) => fs.lstatSync(path.join(fixturesPath, f)).isFile();
  const onlyFixtures = fixtures.filter(shouldSkip);
  if (onlyFixtures.length) {
    /* eslint-disable jest/no-disabled-tests */
    test.skip.each(fixtures.filter((name) => !shouldSkip(name)))(
      'matches expected output: %s',
      () => {},
    );
    /* eslint-enable jest/no-disabled-tests */
    fixtures = onlyFixtures;
  }

  test.each(fixtures.filter(isFile))('matches expected output: %s', async (file) => {
    const input = fs.readFileSync(path.join(fixturesPath, file), 'utf8');
    const output = await getOutputForFixture(input, operation, file);
    const snapshotName =
      customSnapshotName ?? crypto.createHash('md5').update(operation.toString()).digest('hex');

    expect({
      // $FlowIssue[invalid-computed-prop]: https://github.com/facebook/flow/issues/3258
      [FIXTURE_TAG]: true,
      input: input,
      output: output,
    }).toMatchSnapshot(snapshotName);
  });
}
