// @flow

import { invariant } from '@adeira/js';
import GlobalID, { type OpaqueIDString, encode, decode } from '@adeira/graphql-global-id';
import { values as FaunaValues, type values$Document as FaunaDocument } from 'faunadb';
import { type GraphQLFieldConfig } from 'graphql';

type AnyFaunaDocument = FaunaDocument<$Shape<{||}>>;

export default function GlobalFaunaID(): GraphQLFieldConfig<any, any> {
  const idFetcher = ({ ref }: AnyFaunaDocument) => {
    invariant(ref != null, 'Invalid document. Ref is null or undefined');
    return `${ref.id}`;
  };
  const opaqueIdFetcher = ({ ref }: AnyFaunaDocument) => {
    invariant(ref != null, 'Invalid document. Ref is null or undefined');
    return refToString(ref);
  };

  return GlobalID(idFetcher, opaqueIdFetcher);
}

function refToString(ref: FaunaValues.Ref): string {
  const { id, collection } = ref;

  if (collection?.database?._isFaunaRef === true) {
    return `${collection.database.id}:${collection.id}:${id}`;
  }

  invariant(collection?._isFaunaRef === true, 'Invalid input. Ref is missing a collection');

  return `${collection.id}:${id}`;
}

export function refToId(ref: FaunaValues.Ref): OpaqueIDString {
  return encode(refToString(ref));
}

export function idToRef(id: string): FaunaValues.Ref {
  const collection = idToCollection(id);
  const parts = decodeGlobalId(id);
  const internalId = parts.pop();

  return new FaunaValues.Ref(internalId, collection);
}

export function idToCollection(id: string): FaunaValues.Ref {
  const parts = decodeGlobalId(id);

  invariant(!parts.includes(''), `Invalid ID: ${id}`);
  invariant(parts.length === 2 || parts.length === 3, `Invalid ID: ${id}`);

  if (parts.length === 3) {
    const db = new FaunaValues.Ref(parts[0], FaunaValues.Native.DATABASES);
    return new FaunaValues.Ref(parts[1], FaunaValues.Native.COLLECTIONS, db);
  }

  return new FaunaValues.Ref(parts[0], FaunaValues.Native.COLLECTIONS);
}

function decodeGlobalId(id: string): string[] {
  const _id = ((id: any): OpaqueIDString); // cast string to OpaqueIDString
  return decode(_id)
    .split(':')
    .map((p) => p.trim());
}
