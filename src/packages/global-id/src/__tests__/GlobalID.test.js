// @flow

import GlobalID from '../GlobalID';

function base64(text) {
  // use native Buffer here (not polyfill) to make sure it behaves correctly
  return Buffer.from(text, 'utf8').toString('base64');
}

function resolveField(field, args = {}) {
  return (
    field.resolve &&
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
    )
  );
}

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
