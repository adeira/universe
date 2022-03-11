// @flow

import { values as FaunaValues } from 'faunadb';
import { nullthrows } from '@adeira/js';

import GlobalFaunaID from '../index';

function resolveField(field, source, typename, opaque = true) {
  return field.resolve(
    source,
    { opaque },
    undefined, // context
    {
      parentType: {
        name: typename,
      },
    },
  );
}

function createRef(collection: string, idValue: string) {
  return new FaunaValues.Ref(
    idValue,
    new FaunaValues.Ref(collection, FaunaValues.Native.COLLECTIONS),
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

test('field definition is as expected', () => {
  const field = GlobalFaunaID();

  expect(field).toMatchInlineSnapshot(`
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

it('resolves opaque ID', () => {
  const collection = 'MyCol';
  const ref = createRef(collection, '12345');
  const idField = GlobalFaunaID();

  expect(resolveField(idField, { ref }, collection)).toMatchInlineSnapshot(`"TXlDb2w6MTIzNDU"`);
});

it('resolves non-opaque ID', () => {
  const collection = 'MyCol';
  const ref = createRef(collection, '12345');
  const idField = GlobalFaunaID();

  expect(resolveField(idField, { ref }, collection, false)).toMatchInlineSnapshot(`"MyCol:12345"`);
});

it('throws error when ref is missing', () => {
  const idField = GlobalFaunaID();

  const error = catchError(() => resolveField(idField, {}, 'SomeType'));
  expect(error).toBeInstanceOf(Error);
  expect(error.name).toBe('Invariant Violation'); // this error is for developers
  expect(error.message).toBe('Invalid document. Ref is null or undefined');
});
