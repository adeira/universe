// @flow

import os from 'os';
import { isObject } from '@kiwicom/js';

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
export default function generateTestsFromFixtures(
  fixturesPath: string,
  operation: (input: string) => OperationOutput,
): void {
  const fs = require('fs');
  const path = require('path');

  const fixtures = fs.readdirSync(fixturesPath);

  test(`has fixtures in ${fixturesPath}`, () => {
    expect(fixtures.length > 0).toBe(true);
  });

  test.each(fixtures)('matches expected output: %s', async file => {
    const input = fs.readFileSync(path.join(fixturesPath, file), 'utf8');
    const output = await getOutputForFixture(input, operation);
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
): Promise<any> {
  try {
    const output = operation(input);
    return output instanceof Promise ? await output : output;
  } catch (e) {
    return `THROWN EXCEPTION:\n\n${e.toString()}`;
  }
}
