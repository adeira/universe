// @flow strict-local

import { nullthrows } from '@adeira/js';
import { decode, encode } from '@adeira/graphql-global-id';
import { values as FaunaValues } from 'faunadb';

import { refToId, idToCollection, idToRef } from '../index';

const db = new FaunaValues.Ref('MyDb', FaunaValues.Native.DATABASES);
const collection = new FaunaValues.Ref('MyCol', FaunaValues.Native.COLLECTIONS);
const collectionWithDb = new FaunaValues.Ref('MyCol', FaunaValues.Native.COLLECTIONS, db);

const refWithoutDb = new FaunaValues.Ref('12345', collection);
const refWithDb = new FaunaValues.Ref('12345', collectionWithDb);
const invalidIds = ['xyz', ':xyz', 'xyz:', ':xyz:', ' :xyz', ':col:xyz', 'db::xyz'];

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

describe('refToId', () => {
  it('handles ref without database', () => {
    const id = refToId(refWithoutDb);
    const decodedId = id == null ? null : decode(id);

    expect(id).toMatchInlineSnapshot(`"TXlDb2w6MTIzNDU"`);
    expect(decodedId).toMatchInlineSnapshot(`"MyCol:12345"`);
  });

  it('handles ref with database', () => {
    const id = refToId(refWithDb);
    const decodedId = id == null ? null : decode(id);

    expect(id).toMatchInlineSnapshot(`"TXlEYjpNeUNvbDoxMjM0NQ"`);
    expect(decodedId).toMatchInlineSnapshot(`"MyDb:MyCol:12345"`);
  });

  it('throws on Ref without collection', () => {
    const ref = new FaunaValues.Ref('1234');

    const error = catchError(() => refToId(ref));
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Invariant Violation');
    expect(error.message).toMatchInlineSnapshot(`"Invalid input. Ref is missing a collection"`);
  });
});

describe('idToCollection', () => {
  it('handles id without database', () => {
    const id = refToId(refWithoutDb);

    const collection = idToCollection(id);

    expect(collection.id).toBe('MyCol');
    expect(collection.database).toBeUndefined();
  });

  it('handles id with database', () => {
    const id = refToId(refWithDb);

    const collection = idToCollection(id);

    expect(collection.id).toBe('MyCol');
    expect(collection.database?.id).toBe('MyDb');
  });

  it.each(invalidIds.map((id) => [id]))('throws error on invalid ID', (id) => {
    const encodedId = encode(id);

    const error = catchError(() => idToCollection(encodedId));

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Invariant Violation');
    expect(error.message).toBe(`Invalid ID: ${encodedId}`);
  });
});

describe('idToRef', () => {
  it('handles id without database', () => {
    const id = refToId(refWithoutDb);
    const ref = idToRef(id);

    expect(id).toMatchInlineSnapshot(`"TXlDb2w6MTIzNDU"`);
    expect(ref.id).toBe('12345');
    expect(ref.collection?.id).toBe('MyCol');
    expect(ref.collection?.database).toBeUndefined();
  });

  it('handles id with database', () => {
    const id = refToId(refWithDb);
    const ref = idToRef(id);

    expect(id).toMatchInlineSnapshot(`"TXlEYjpNeUNvbDoxMjM0NQ"`);
    expect(ref.id).toBe('12345');
    expect(ref.collection?.id).toBe('MyCol');
    expect(ref.collection?.database?.id).toBe('MyDb');
  });

  it.each(invalidIds.map((id) => [id]))('throws error on invalid ID', (id: string) => {
    const encodedId = encode(id);

    const error = catchError(() => idToRef(encodedId));

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('Invariant Violation');
    expect(error.message).toBe(`Invalid ID: ${encodedId}`);
  });
});
