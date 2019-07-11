// @flow

import { GraphQLObjectType, GraphQLID } from 'graphql';

import GlobalID, { fromGlobalId, evaluateGlobalIdField, __isTypeOf } from '../GlobalID';

function base64(text) {
  return Buffer.from(text).toString('base64');
}

function resolveField(field, args = { opaque: true }): string {
  if (!field.resolve) {
    throw new Error('Cannot resolve this field because "resolve" function is not implemented.');
  }

  return String(
    field.resolve(
      undefined, // ancestor
      args,
      undefined, // context
      // $FlowExpectedError: this is incomplete info only for test purposes
      {
        parentType: {
          name: 'TypeName',
        },
      },
    ),
  );
}

describe('GlobalID', () => {
  it('returns expected field configuration', () => {
    expect(GlobalID(() => 'mock')).toMatchInlineSnapshot(`
Object {
  "args": Object {
    "opaque": Object {
      "defaultValue": true,
      "type": "Boolean",
    },
  },
  "description": "The globally unique ID of an object. You can unmask this ID to get original value but please note that this unmasked ID is not globally unique anymore and therefore it cannot be used as a cache key.",
  "resolve": [Function],
  "type": "ID!",
  Symbol(graphql_global_id): true,
}
`);
  });

  it('works with opaque identifier', () => {
    const idFetcher = () => '123';
    const field = GlobalID(idFetcher);

    expect(
      resolveField(field, {
        opaque: true,
      }),
    ).toBe(base64('TypeName:123'));
  });

  it('works with unmasked identifier', () => {
    const idFetcher = () => '123';
    const field = GlobalID(idFetcher);

    expect(
      resolveField(field, {
        opaque: false,
      }),
    ).toBe('123');
  });

  it('is possible to overwrite the unmasking implementation', () => {
    const idFetcher = () => '123';
    const opaqueIdFetcher = () => '999';
    const field = GlobalID(idFetcher, opaqueIdFetcher);

    expect(
      resolveField(field, {
        opaque: false,
      }),
    ).toBe('999');
  });

  it('throws error for original ID being "null"', () => {
    // $FlowExpectedError: ID fetcher result should nto be null
    const idFetcher = () => null;
    const field = GlobalID(idFetcher);
    expect(() => resolveField(field)).toThrowErrorMatchingInlineSnapshot(
      '"Global ID cannot be null."',
    );
  });

  it('throws error for original ID being "undefined"', () => {
    // $FlowExpectedError: ID fetcher result should nto be undefined
    const idFetcher = () => undefined;
    const field = GlobalID(idFetcher);
    expect(() => resolveField(field)).toThrowErrorMatchingInlineSnapshot(
      '"Global ID cannot be undefined."',
    );
  });
});

describe('fromGlobalId', () => {
  it('returns correct original ID', () => {
    const idFetcher = () => 1234;
    const field = GlobalID(idFetcher);
    expect(fromGlobalId(resolveField(field))).toBe('1234');
  });

  it('returns correct original string ID', () => {
    const idFetcher = () => 'tESt';
    const field = GlobalID(idFetcher);
    expect(fromGlobalId(resolveField(field))).toBe('tESt');
  });

  it('throws an error on invalid opaque ID', () => {
    expect(() => fromGlobalId('invalid-value')).toThrow(
      "ID 'invalid-value' is not valid opaque value.",
    );

    // encoded "invalid-value" (vv)
    expect(() => fromGlobalId('aW52YWxpZC12YWx1ZQ==')).toThrow(
      "ID 'aW52YWxpZC12YWx1ZQ==' is not valid opaque value.",
    );
  });
});

describe('isTypeOf', () => {
  const ID = GlobalID(() => 42);
  it('resolves the type correctly', () => {
    expect(__isTypeOf('WrongTypeName', resolveField(ID))).toBe(false);
    expect(__isTypeOf('TypeName', resolveField(ID))).toBe(true);
  });

  it('throws an error on invalid opaque ID', () => {
    expect(() => __isTypeOf('TypeName', 'invalid-value')).toThrow(
      "ID 'invalid-value' is not valid opaque value.",
    );

    // encoded "invalid-value" (vv)
    expect(() => __isTypeOf('TypeName', 'aW52YWxpZC12YWx1ZQ==')).toThrow(
      "ID 'aW52YWxpZC12YWx1ZQ==' is not valid opaque value.",
    );
  });
});

describe('evaluateGlobalIdField', () => {
  it('works with standard output object', () => {
    expect(
      evaluateGlobalIdField(
        new GraphQLObjectType({
          name: 'Test',
          fields: {
            id: GlobalID(() => 123),
          },
        }),
      ),
    ).toBe(base64('Test:123'));
  });

  it('throws when trying to use incompatible output type', () => {
    expect(() =>
      evaluateGlobalIdField(
        new GraphQLObjectType({
          name: 'Test',
          fields: {
            id: {
              type: GraphQLID,
            },
          },
        }),
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      '"Unable to evaluate field \'id\' because provided object is not typeof GlobalID."',
    );
  });

  it('throws when id filed is missing', () => {
    expect(() =>
      evaluateGlobalIdField(
        new GraphQLObjectType({
          name: 'Test',
          fields: {
            notIdField: {
              type: GraphQLID,
            },
          },
        }),
      ),
    ).toThrowErrorMatchingInlineSnapshot("\"Unable to evaluate field 'id' because it's missing.\"");
  });

  it('calls resolver with correct arguments', () => {
    const resolveMock = jest.fn();
    evaluateGlobalIdField(
      new GraphQLObjectType({
        name: 'Test',
        fields: {
          id: {
            ...GlobalID(() => 123),
            resolve: resolveMock,
          },
        },
      }),
    );
    expect(resolveMock).toBeCalledWith(
      undefined, // parent
      { opaque: true },
      undefined,
      {
        parentType: expect.any(GraphQLObjectType),
      },
    );
  });

  it('calls resolver with correct additional arguments', () => {
    const resolveMock = jest.fn();
    evaluateGlobalIdField(
      new GraphQLObjectType({
        name: 'Test',
        fields: {
          id: {
            ...GlobalID(() => 123),
            resolve: resolveMock,
          },
        },
      }),
      { parent: 'exist' },
      { testArg: true },
      { context: 'yes' },
    );
    expect(resolveMock).toBeCalledWith(
      { parent: 'exist' },
      { opaque: true, testArg: true },
      { context: 'yes' },
      { parentType: expect.any(GraphQLObjectType) },
    );
  });
});
