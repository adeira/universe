// @flow

import { nullthrows } from '@adeira/js';

import GlobalID, { fromGlobalId, isTypeOf, toGlobalId } from '../GlobalID';
import type { OpaqueIDString } from '../Encoder';

// This typecast is necessary only for testing purposes. In normal scenarios, you'd create the
// opaque value with the factory methods (but we need to hardcode them in this test).
function __castOpaque(i: mixed): OpaqueIDString {
  return ((String(i): any): OpaqueIDString);
}

function resolveField(
  field,
  args = { opaque: true },
  typename: string = 'TypeName',
): OpaqueIDString {
  if (!field.resolve) {
    throw new Error('Cannot resolve this field because "resolve" function is not implemented.');
  }

  return __castOpaque(
    field.resolve(
      undefined, // ancestor
      args,
      undefined, // context
      {
        parentType: {
          name: typename,
        },
      },
    ),
  );
}

// This helper is used instead of `toThrow` so we can test more properties of this error.
function catchError(callback): Error | empty {
  let error = null;
  try {
    callback();
  } catch (e) {
    error = e;
  }
  return nullthrows(
    error,
    `Function 'catchError' supposed to catch an error but no error was thrown.`,
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
    ).toBe('VHlwZU5hbWU6MTIz');
  });

  it('generates URL compatible output', () => {
    const idFetcher = () => '1';
    const field = GlobalID(idFetcher);

    expect(
      resolveField(
        field,
        {
          opaque: true,
        },
        '???',
      ),
    ).toBe('Pz8_OjE'); // classic Base64 would generate 'Pz8/OjE=' which is not compatible with URL format.
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
    const idFetcher = () => null;
    // $FlowExpectedError[incompatible-call]: ID fetcher should not return null (testing purposes only)
    const field = GlobalID(idFetcher);
    const error = catchError(() => resolveField(field));
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Invariant Violation'); // this error is for developers
    expect(error.message).toBe('Global ID cannot be null.');
  });

  it('throws error for original ID being "undefined"', () => {
    const idFetcher = () => undefined;
    // $FlowExpectedError[incompatible-call]: ID fetcher should not return undefined (testing purposes only)
    const field = GlobalID(idFetcher);
    const error = catchError(() => resolveField(field));
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Invariant Violation'); // this error is for developers
    expect(error.message).toBe('Global ID cannot be undefined.');
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
    expect(() => fromGlobalId(__castOpaque('invalid-value'))).toThrow(
      "ID 'invalid-value' is not valid opaque value.",
    );

    // encoded "invalid-value" (vv)
    expect(() => fromGlobalId(__castOpaque('aW52YWxpZC12YWx1ZQ=='))).toThrow(
      "ID 'aW52YWxpZC12YWx1ZQ==' is not valid opaque value.",
    );
  });
});

describe('toGlobalId', () => {
  it.each([
    ['SomeType', 'abc'],
    ['AnotherType', 123],
  ])('works with string or numeric id', (type, id) => {
    const globalId = toGlobalId(type, id);

    expect(fromGlobalId(globalId)).toBe(id.toString());
    expect(isTypeOf(type, globalId)).toBe(true);
  });
});

describe('isTypeOf', () => {
  const ID = GlobalID(() => 42);
  it('resolves the type correctly', () => {
    expect(isTypeOf('WrongTypeName', resolveField(ID))).toBe(false);
    expect(isTypeOf('TypeName', resolveField(ID))).toBe(true);
  });

  it('throws an error on invalid opaque ID', () => {
    let error = catchError(() => isTypeOf('TypeName', __castOpaque('invalid-value')));
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Error'); // no 'Invariant Violation'!
    expect(error.message).toBe("ID 'invalid-value' is not valid opaque value.");

    error = catchError(() => isTypeOf('TypeName', __castOpaque('aW52YWxpZC12YWx1ZQ==')));
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Error'); // no 'Invariant Violation'!
    expect(error.message).toBe("ID 'aW52YWxpZC12YWx1ZQ==' is not valid opaque value.");
  });

  it.each([null, undefined, 42, [], new Date()])(
    'handles incorrect usages gracefully - opaqueID=%p',
    (input) => {
      expect(isTypeOf('TypeName', input)).toBe(false);
    },
  );
});
