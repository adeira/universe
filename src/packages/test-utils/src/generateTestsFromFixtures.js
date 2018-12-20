// @flow

import os from 'os';
import { invariant } from '@mrtnzlml/utils';

const FIXTURE_TAG = Symbol.for('FIXTURE_TAG');

function isObject(value): boolean %checks {
  return typeof value === 'object' && value !== null;
}

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
        const inspectedValue = isObject(value)
          ? JSON.stringify(value, null, 2)
          : value;
        return `~~~~~~~~~~ ${key.toUpperCase()} ~~~~~~~~~~\n${inspectedValue}`;
      })
      .join(os.EOL);
  },
  test(value) {
    return value && value[FIXTURE_TAG] === true;
  },
});

/**
 * Generates a set of jest snapshot tests that compare the output of the
 * provided `operation` to each of the matching files in the `fixturesPath`.
 */
export default function generateTestsFromFixtures(
  fixturesPath: string,
  operation: (input: string) => string | Promise<string>,
): void {
  const fs = require('fs');
  const path = require('path');
  const tests = fs.readdirSync(fixturesPath).map(async file => {
    const input = fs.readFileSync(path.join(fixturesPath, file), 'utf8');
    const output = await getOutputForFixture(input, operation);
    return {
      file,
      input,
      output,
    };
  });
  invariant(
    tests.length > 0,
    'generateTestsFromFixtures: No fixtures found at %s',
    fixturesPath,
  );
  it('matches expected output', async () => {
    const results = await Promise.all(tests);
    results.forEach(test => {
      expect({
        // $FlowIssue: https://github.com/facebook/flow/issues/3258
        [FIXTURE_TAG]: true,
        input: test.input,
        output: test.output,
      }).toMatchSnapshot(test.file);
    });
  });
}

async function getOutputForFixture(
  input: string,
  operation: (input: string) => string | Promise<string>,
): Promise<string> {
  try {
    const output = operation(input);
    return output instanceof Promise ? await output : output;
  } catch (e) {
    return `THROWN EXCEPTION:\n\n${e.toString()}`;
  }
}
