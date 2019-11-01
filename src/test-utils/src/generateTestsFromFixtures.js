// @flow

import os from 'os';
import { isObject } from '@adeira/js';

const FIXTURE_TAG = Symbol.for('FIXTURE_TAG');

/**
 * Extend Jest with a custom snapshot serializer to provide additional context
 * and reduce the amount of escaping that occurs. This serializer is heavily
 * inspired by Relay test cases.
 */
expect.addSnapshotSerializer({
  print(serializerValue) {
    return Object.keys(serializerValue)
      .map(key => {
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
): void {
  const fs = require('fs');
  const path = require('path');

  let fixtures = fs.readdirSync(fixturesPath);

  test(`has fixtures in ${fixturesPath}`, () => {
    expect(fixtures.length > 0).toBe(true);
  });

  const shouldSkip = file => /\.only\.\w+$/.test(file);
  const onlyFixtures = fixtures.filter(shouldSkip);
  if (onlyFixtures.length) {
    // $FlowFixMe: we need to update our Jest type definitions (TODO)
    test.skip.each(fixtures.filter(name => !shouldSkip(name)))(
      'matches expected output: %s',
      () => {},
    );
    fixtures = onlyFixtures;
  }

  test.each(fixtures)('matches expected output: %s', async file => {
    const input = fs.readFileSync(path.join(fixturesPath, file), 'utf8');
    const output = await getOutputForFixture(input, operation, file);
    expect({
      // $FlowIssue: https://github.com/facebook/flow/issues/3258
      [FIXTURE_TAG]: true,
      input: input,
      output: output,
    }).toMatchSnapshot();
  });
}

async function getOutputForFixture(
  input: string,
  operation: (input: string) => OperationOutput,
  file: string,
): Promise<any> {
  const shouldThrow = /\.error\.\w+$/.test(file);
  if (shouldThrow) {
    let result;
    try {
      result = await operation(input);
    } catch (error) {
      return `THROWN EXCEPTION:\n\n${error.toString()}`;
    }
    throw new Error(`Expected test file '${file}' to throw, but it passed:\n${result}`);
  } else {
    return operation(input);
  }
}
