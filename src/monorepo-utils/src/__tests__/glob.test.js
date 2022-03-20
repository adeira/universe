// @flow

import path from 'path';

import { glob, globSync, globAsync } from '../glob';

function voidCallback() {}

describe('glob', () => {
  it('throws exception when used incorrectly with Windows path', () => {
    const windowsErrorMessage =
      "Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: ";
    expect(() => glob('C:\\foo\\bar.txt', voidCallback)).toThrow(windowsErrorMessage);
    expect(() => glob('F:\\foo\\*', voidCallback)).toThrow(windowsErrorMessage);
  });

  it('throws when used with root pattern with root being set', () => {
    expect(() => glob('/root/pattern', voidCallback)).toThrow(
      "Your glob pattern starts from root but you didn't define any root in glob options.",
    );
  });

  it('accepts valid pattern', () => {
    expect(() => glob('src/apps/*/package.json', voidCallback)).not.toThrow();
  });

  it('ignores node_modules by default', (done) => {
    glob(
      '/**/*.js',
      { root: path.join(__dirname, 'fixtures', 'glob', 'aaa') },
      (error, filenames) => {
        expect(error).toBeNull();
        expect(filenames.map((filename) => filename.replace(__dirname, ''))).toMatchInlineSnapshot(`
        Array [
          "/fixtures/glob/aaa/file.js",
          "/fixtures/glob/aaa/subfolder/file.js",
        ]
      `);
        done();
      },
    );
  });

  it('throws when used with two callbacks', () => {
    // $FlowExpectedError[incompatible-call]: second argument cannot be callback
    expect(() => glob('pattern', voidCallback, voidCallback)).toThrow(
      'Glob function accepts only one callback.',
    );
  });
});

describe('globSync', () => {
  it('throws exception when used incorrectly with Windows path', () => {
    const windowsErrorMessage =
      "Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: ";
    expect(() => globSync('C:\\foo\\bar.txt')).toThrow(windowsErrorMessage);
    expect(() => globSync('F:\\foo\\*')).toThrow(windowsErrorMessage);
  });

  it('throws when used with root pattern with root being set', () => {
    expect(() => globSync('/root/pattern')).toThrow(
      "Your glob pattern starts from root but you didn't define any root in glob options.",
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
        Array [
          "/fixtures/glob/aaa/file.js",
          "/fixtures/glob/aaa/subfolder/file.js",
        ]
      `);
  });
});

describe('globAsync', () => {
  it('throws exception when used incorrectly with Windows path', async () => {
    const windowsErrorMessage =
      "Your glob patterns looks like absolute Windows path but this is not allowed. Glob doesn't accept paths but glob patterns instead. Invalid pattern: ";
    await expect(globAsync('C:\\foo\\bar.txt')).rejects.toThrow(windowsErrorMessage);
    await expect(globAsync('F:\\foo\\*')).rejects.toThrow(windowsErrorMessage);
  });

  it('throws when used with root pattern with root being set', async () => {
    await expect(globAsync('/root/pattern')).rejects.toThrow(
      "Your glob pattern starts from root but you didn't define any root in glob options.",
    );
  });

  it('accepts valid pattern', async () => {
    await expect(globAsync('src/apps/*/package.json')).resolves.not.toThrow();
  });

  it('ignores node_modules by default', async () => {
    const filenames = await globAsync('/**/*.js', {
      root: path.join(__dirname, 'fixtures', 'glob', 'aaa'),
    });
    expect(filenames.map((filename) => filename.replace(__dirname, ''))).toMatchInlineSnapshot(`
        Array [
          "/fixtures/glob/aaa/file.js",
          "/fixtures/glob/aaa/subfolder/file.js",
        ]
      `);
  });
});
