// @flow

import GlobalID, { fromGlobalId, isTypeOf } from '../GlobalID';

function base64(text) {
  return Buffer.from(text).toString('base64');
}

function resolveField(field, args = { opaque: true }): string {
  if (!field.resolve) {
    throw new Error(
      'Cannot resolve this field because "resolve" function is not implemented.',
    );
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
    expect(() => resolveField(field)).toThrowError(
      'Global ID cannot be null or undefined.',
    );
  });

  it('throws error for original ID being "undefined"', () => {
    // $FlowExpectedError: ID fetcher result should nto be undefined
    const idFetcher = () => undefined;
    const field = GlobalID(idFetcher);
    expect(() => resolveField(field)).toThrowError(
      'Global ID cannot be null or undefined.',
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
});

describe('isTypeOf', () => {
  const ID = GlobalID(() => 42);
  it('resolves the type correctly', () => {
    expect(isTypeOf('WrongTypeName', resolveField(ID))).toBe(false);
    expect(isTypeOf('TypeName', resolveField(ID))).toBe(true);
  });
});
