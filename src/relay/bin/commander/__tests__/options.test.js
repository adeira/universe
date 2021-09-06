// @flow

let fetchSchemaOptions;
let relayCompilerOptions;
beforeEach(() => {
  jest.isolateModules(() => {
    fetchSchemaOptions = require('../options').fetchSchemaOptions;
    relayCompilerOptions = require('../options').relayCompilerOptions;
  });
});

describe('fetch schema', () => {
  it('no args', () => {
    expect(() => fetchSchemaOptions(['node', 'test'])).toThrowErrorMatchingInlineSnapshot(
      `"Option --resource is required."`,
    );
  });

  it('with only filename', () => {
    expect(() =>
      fetchSchemaOptions(['node', 'test', '--filename=AAA']),
    ).toThrowErrorMatchingInlineSnapshot(`"Option --resource is required."`);
  });

  it('with only resource', () => {
    expect(() =>
      fetchSchemaOptions(['node', 'test', '--resource=BBB']),
    ).toThrowErrorMatchingInlineSnapshot(`"Option --filename is required."`);
  });

  it('with filename,resource', () => {
    expect(fetchSchemaOptions(['node', 'test', '--filename=AAA', '--resource=BBB'])).toStrictEqual({
      resource: 'BBB',
      schema: 'AAA',
    });
  });
});

describe('relay compiler', () => {
  it('no args', () => {
    expect(() => relayCompilerOptions(['node', 'test'])).toThrowErrorMatchingInlineSnapshot(
      `"Option --src is required."`,
    );
  });

  it('with only src', () => {
    expect(() =>
      relayCompilerOptions(['node', 'test', '--src=AAA']),
    ).toThrowErrorMatchingInlineSnapshot(`"Option --schema is required."`);
  });

  it('with only schema', () => {
    expect(() =>
      relayCompilerOptions(['node', 'test', '--schema=BBB']),
    ).toThrowErrorMatchingInlineSnapshot(`"Option --src is required."`);
  });

  it('with only validate', () => {
    expect(() =>
      relayCompilerOptions(['node', 'test', '--validate']),
    ).toThrowErrorMatchingInlineSnapshot(`"Option --src is required."`);
  });

  it('with only watch', () => {
    expect(() =>
      relayCompilerOptions(['node', 'test', '--watch']),
    ).toThrowErrorMatchingInlineSnapshot(`"Option --src is required."`);
  });

  it('with src,schema', () => {
    expect(relayCompilerOptions(['node', 'test', '--src=AAA', '--schema=BBB'])).toStrictEqual({
      src: 'AAA',
      schema: 'BBB',
      validate: false,
      watch: false,
    });
  });

  it('with all', () => {
    expect(
      relayCompilerOptions(['node', 'test', '--src=AAA', '--schema=BBB', '--validate', '--watch']),
    ).toStrictEqual({
      src: 'AAA',
      schema: 'BBB',
      validate: true,
      watch: true,
    });
  });
});
