// @flow

import fs from 'fs';
import path from 'path';
import stripAnsi from 'strip-ansi';
import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import { buildBreakingChangesBlock } from '../BCLogger';
import testBackwardCompatibility from '../index';

function operation(newBreakingChanges) {
  return input => buildBreakingChangesBlock(input, newBreakingChanges);
}

generateTestsFromFixtures(`${__dirname}/__fixtures__`, operation());
generateTestsFromFixtures(
  `${__dirname}/__fixtures__`,
  operation([
    {
      type: 'append',
      description: 'this',
    },
    {
      type: 'and append',
      description: 'also this',
    },
  ]),
);

it('prints success message when there are no breaking changes', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  testBackwardCompatibility({
    allowBreakingChanges: false,
    snapshotLocation: path.join(__dirname, 'testSchemaSnapshot.graphql'),
    schema: require('./testSchema').validSchema,
  });

  expect(stripAnsi(consoleSpy.mock.calls[0][0]).trim()).toMatchSnapshot();

  jest.restoreAllMocks();
});

it('prints error messages when there are breaking changes', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  const processSpy = jest.spyOn(process, 'exit').mockImplementation(code => {
    throw new Error(`process.exit(${code}) was called`);
  });

  expect(() =>
    testBackwardCompatibility({
      allowBreakingChanges: false,
      snapshotLocation: path.join(__dirname, 'testSchemaSnapshot.graphql'),
      schema: require('./testSchema').breakingSchema,
    }),
  ).toThrow('process.exit(1) was called');

  expect(stripAnsi(consoleErrorSpy.mock.calls[0][0]).trim()).toMatchSnapshot();
  expect(stripAnsi(consoleLogSpy.mock.calls[0][0]).trim()).toMatchSnapshot();
  expect(processSpy).toHaveBeenCalledWith(1);

  jest.restoreAllMocks();
});

it('prints error messages when the schema is manually polluted', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const processSpy = jest.spyOn(process, 'exit').mockImplementation(code => {
    throw new Error(`process.exit(${code}) was called`);
  });

  expect(() =>
    testBackwardCompatibility({
      allowBreakingChanges: false,
      snapshotLocation: path.join(
        __dirname,
        'testSchemaSnapshotPolluted.graphql',
      ),
      schema: require('./testSchema').validSchema,
    }),
  ).toThrow('process.exit(1) was called');
  expect(stripAnsi(consoleSpy.mock.calls[0][0]).trim()).toMatchSnapshot();
  expect(processSpy).toHaveBeenCalledWith(1);

  jest.restoreAllMocks();
});

it('prints warning and updates the schema when backward compatible changes detected', () => {
  const fsSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const processSpy = jest.spyOn(process, 'exit').mockImplementation(code => {
    throw new Error(`process.exit(${code}) was called`);
  });

  expect(() =>
    testBackwardCompatibility({
      allowBreakingChanges: false,
      snapshotLocation: path.join(__dirname, 'testSchemaSnapshot.graphql'),
      schema: require('./testSchema').compatibleSchema,
    }),
  ).toThrow('process.exit(1) was called');

  expect(fsSpy.mock.calls[0][1]).toMatchSnapshot();
  expect(
    consoleSpy.mock.calls.map(call => stripAnsi(call[0]).trim()),
  ).toMatchSnapshot();
  expect(processSpy).toHaveBeenCalledWith(1);

  jest.restoreAllMocks();
});
