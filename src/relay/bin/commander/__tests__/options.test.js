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
    expect(fetchSchemaOptions(['node', 'test'])).toStrictEqual({
      filename: 'schema.graphql',
    });
  });

  it('with filename', () => {
    expect(fetchSchemaOptions(['node', 'test', '--filename=AAA'])).toStrictEqual({
      filename: 'AAA',
    });
  });

  it('with resource', () => {
    expect(fetchSchemaOptions(['node', 'test', '--resource=BBB'])).toStrictEqual({
      filename: 'schema.graphql',
      resource: 'BBB',
    });
  });

  it('with filename,resource', () => {
    expect(fetchSchemaOptions(['node', 'test', '--filename=AAA', '--resource=BBB'])).toStrictEqual({
      filename: 'AAA',
      resource: 'BBB',
    });
  });
});

describe('relay compiler', () => {
  it('no args', () => {
    expect(relayCompilerOptions(['node', 'test'])).toStrictEqual({
      validate: false,
      watch: false,
    });
  });

  it('with src', () => {
    expect(relayCompilerOptions(['node', 'test', '--src=AAA'])).toStrictEqual({
      src: 'AAA',
      validate: false,
      watch: false,
    });
  });

  it('with schema', () => {
    expect(relayCompilerOptions(['node', 'test', '--schema=BBB'])).toStrictEqual({
      schema: 'BBB',
      validate: false,
      watch: false,
    });
  });

  it('with persist mode', () => {
    expect(relayCompilerOptions(['node', 'test', '--persist-mode=CCC'])).toStrictEqual({
      persistMode: 'CCC',
      validate: false,
      watch: false,
    });
  });

  it('with validate', () => {
    expect(relayCompilerOptions(['node', 'test', '--validate'])).toStrictEqual({
      validate: true,
      watch: false,
    });
  });

  it('with watch', () => {
    expect(relayCompilerOptions(['node', 'test', '--watch'])).toStrictEqual({
      validate: false,
      watch: true,
    });
  });
});
