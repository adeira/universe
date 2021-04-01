// @flow

let fetchSchemaOptions;
beforeEach(() => {
  jest.isolateModules(() => {
    fetchSchemaOptions = require('../options').fetchSchemaOptions;
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
