// @flow

import * as utils from '@adeira/monorepo-utils';

import shouldLintAll from '../shouldLintAll';

jest.mock('@adeira/monorepo-utils', () => ({
  findMonorepoRoot: () => '../../../',
  ShellCommand: jest.fn(),
}));

beforeEach(() => {
  jest.resetModules();
});

test.each([
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.yml',
  '.eslintrc.yaml',
  '.eslintrc.json',
  'src/packages/relay/.eslintrc.js',
  '/Users/TEST/universe/src/packages/relay/.eslintrc.js',
  '.eslintignore',
])('filename "%s" IS eslint config file', filename => {
  expect(shouldLintAll(filename)).toBe(true);
});

it('should lint all for package.json if dependency is removed', () => {
  jest.spyOn(utils, 'ShellCommand').mockImplementationOnce(() => ({
    runSynchronously: () => ({
      getStdout: () => JSON.stringify({ dependencies: { a: 'lol', b: 'lol2' } }),
    }),
  }));
  jest.doMock('../../../../package.json', () => ({
    dependencies: { a: 'lol' },
  }));
  expect(shouldLintAll('package.json')).toBe(true);
});

it('should not lint all for package.json if dependency is added', () => {
  jest.spyOn(utils, 'ShellCommand').mockImplementationOnce(() => ({
    runSynchronously: () => ({
      getStdout: () => JSON.stringify({ dependencies: { a: 'lol', b: 'lol2' } }),
    }),
  }));
  jest.doMock('../../../../package.json', () => ({
    dependencies: { a: 'lol', b: 'lol2', c: 'lol3' },
  }));

  expect(shouldLintAll('package.json')).toBe(false);
});

it('should not lint all for package.json if dependency is upgraded', () => {
  jest.spyOn(utils, 'ShellCommand').mockImplementationOnce(() => ({
    runSynchronously: () => ({
      getStdout: () => JSON.stringify({ dependencies: { a: 'lol', b: 'lol2' } }),
    }),
  }));
  jest.doMock('../../../../package.json', () => ({
    dependencies: { a: 'lol', b: 'lol3' },
  }));

  expect(shouldLintAll('package.json')).toBe(false);
});

it('should lint all if package.json has eslintConfig field that changed', () => {
  jest.spyOn(utils, 'ShellCommand').mockImplementationOnce(() => ({
    runSynchronously: () => ({
      getStdout: () =>
        JSON.stringify({
          dependencies: { a: 'lol', b: 'lol2' },
          eslintConfig: { rules: { 'no-lol': 1 } },
        }),
    }),
  }));
  jest.doMock('../../../../package.json', () => ({
    dependencies: { a: 'lol', b: 'lol2' },
    eslintConfig: { rules: { 'no-lol': 2 } },
  }));
  expect(shouldLintAll('package.json')).toBe(true);
});

it('should not lint all if package.json has eslintConfig field that did not change', () => {
  jest.spyOn(utils, 'ShellCommand').mockImplementationOnce(() => ({
    runSynchronously: () => ({
      getStdout: () =>
        JSON.stringify({
          dependencies: { a: 'lol', b: 'lol2' },
          eslintConfig: { rules: { 'no-lol': 1 } },
        }),
    }),
  }));
  jest.doMock('../../../../package.json', () => ({
    dependencies: { a: 'lol', b: 'lol2' },
    eslintConfig: { rules: { 'no-lol': 1 } },
  }));
  expect(shouldLintAll('package.json')).toBe(false);
});

it('should lint all if eslintConfig was added to package.json', () => {
  jest.spyOn(utils, 'ShellCommand').mockImplementationOnce(() => ({
    runSynchronously: () => ({
      getStdout: () =>
        JSON.stringify({
          dependencies: { a: 'lol', b: 'lol2' },
        }),
    }),
  }));
  jest.doMock('../../../../package.json', () => ({
    dependencies: { a: 'lol', b: 'lol2' },
    eslintConfig: { rules: { 'no-lol': 2 } },
  }));
  expect(shouldLintAll('package.json')).toBe(true);
});

test.each([
  'eslintrc.yaml',
  '.eslintrc.ts',
  '.eslintrc.jsonp',
  '.eslintrc/xyz',
  'src/.eslintrc/test',
  'src/test/.eslintignore',
])('filename "%s" IS NOT eslint config file', filename => {
  expect(shouldLintAll(filename)).toBe(false);
});
