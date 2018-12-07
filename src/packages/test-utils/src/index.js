// @flow

import { invariant } from '@mrtnzlml/utils';

const FIXTURE_TAG = Symbol.for('FIXTURE_TAG');

/**
 * Extend Jest with a custom snapshot serializer to provide additional context
 * and reduce the amount of escaping that occurs. This serializer is heavily
 * inspired by Relay test cases.
 */
expect.addSnapshotSerializer({
  print(value) {
    return Object.keys(value)
      .map(key => `~~~~~~~~~~ ${key.toUpperCase()} ~~~~~~~~~~\n${value[key]}`)
      .join('\n');
  },
  test(value) {
    return value && value[FIXTURE_TAG] === true;
  },
});

/**
 * Generates a set of jest snapshot tests that compare the output of the
 * provided `operation` to each of the matching files in the `fixturesPath`.
 */
export function generateTestsFromFixtures(
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
