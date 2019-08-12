// @flow strict

import fs from 'fs';
import path from 'path';

import writeEnvFile from '../writeEnvFile';

jest.mock('fs');

const envLocation = path.join(process.cwd(), '.env');

function createEnvFile(content: string) {
  // $FlowExpectedError: this method exists only in our custom mock
  fs.__setMockFiles({
    [envLocation]: content,
  });
}

it("creates a new file if doesn't exist", () => {
  writeEnvFile({ EXAMPLE_ENV: 'example-value' }, false);
  const output = fs.readFileSync(envLocation);
  expect(output).toBe('EXAMPLE_ENV=example-value');
});

it('fails when file already exists', () => {
  createEnvFile('mocked content');
  expect(() => {
    writeEnvFile({ EXAMPLE_ENV: 'example-value' }, false);
  }).toThrow(new Error('.env file already exists, use --force to overwrite.'));
});

it('can overwrite file if specified', () => {
  createEnvFile('mocked content');
  writeEnvFile({ EXAMPLE_ENV: 'example-value' }, true);
  const output = fs.readFileSync(envLocation);
  expect(output).toBe('EXAMPLE_ENV=example-value');
});

it('fails when trying to overwrite already existing keys', () => {
  createEnvFile('EXAMPLE_ENV="custom local content"');
  expect(() => {
    writeEnvFile({ EXAMPLE_ENV: 'example-value' }, false);
  }).toThrow(
    new Error(
      'Cannot overwrite already existing key: EXAMPLE_ENV (use --force to overwrite anyway)',
    ),
  );
});

it('overwrites already existing keys if forced', () => {
  createEnvFile('EXAMPLE_ENV="custom local content"');
  writeEnvFile({ EXAMPLE_ENV: 'example-value' }, true);
  const output = fs.readFileSync(envLocation);
  expect(output).toBe('EXAMPLE_ENV=example-value');
});
