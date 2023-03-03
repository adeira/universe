// @flow

import path from 'path';

import { glob, globSync } from '../glob';

describe('glob', () => {
  it('throws exception when used incorrectly with Windows path', () => {
    expect(() => glob('C:\\foo\\bar.txt')).toThrowErrorMatchingInlineSnapshot(
      `"Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: C:\\foo\\bar.txt"`,
    );
    expect(() => glob('F:\\foo\\*')).toThrowErrorMatchingInlineSnapshot(
      `"Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: F:\\foo\\*"`,
    );
  });

  it('throws when used with root pattern with root being set', () => {
    expect(() => glob('/root/pattern')).toThrowErrorMatchingInlineSnapshot(
      `"Your glob pattern starts from root but you didn't define any root in glob options. Invalid pattern: /root/pattern"`,
    );
  });

  it('accepts valid pattern', async () => {
    await expect(glob('src/apps/*/package.json')).resolves.not.toThrow();
  });

  it('ignores node_modules by default', async () => {
    const filenames = await glob('/**/*.js', {
      root: path.join(__dirname, 'fixtures', 'glob', 'aaa'),
    });

    expect(filenames.map((filename) => filename.replace(__dirname, ''))).toMatchInlineSnapshot(`
      [
        "/fixtures/glob/aaa/file.js",
        "/fixtures/glob/aaa/subfolder/file.js",
      ]
    `);
  });
});

describe('globSync', () => {
  it('throws exception when used incorrectly with Windows path', () => {
    expect(() => globSync('C:\\foo\\bar.txt')).toThrowErrorMatchingInlineSnapshot(
      `"Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: C:\\foo\\bar.txt"`,
    );
    expect(() => globSync('F:\\foo\\*')).toThrowErrorMatchingInlineSnapshot(
      `"Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: F:\\foo\\*"`,
    );
  });

  it('throws when used with root pattern with root being set', () => {
    expect(() => globSync('/root/pattern')).toThrowErrorMatchingInlineSnapshot(
      `"Your glob pattern starts from root but you didn't define any root in glob options. Invalid pattern: /root/pattern"`,
    );
  });

  it('accepts valid pattern', () => {
    expect(() => globSync('src/apps/*/package.json')).not.toThrow();
  });

  it('ignores node_modules by default', () => {
    const filenames = globSync('/**/*.js', {
      root: path.join(__dirname, 'fixtures', 'glob', 'aaa'),
    });

    expect(filenames.map((filename) => filename.replace(__dirname, ''))).toMatchInlineSnapshot(`
      [
        "/fixtures/glob/aaa/file.js",
        "/fixtures/glob/aaa/subfolder/file.js",
      ]
    `);
  });
});
