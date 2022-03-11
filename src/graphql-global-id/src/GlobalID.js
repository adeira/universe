// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLResolveInfo,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLFieldConfig,
} from 'graphql';
import { invariant } from '@adeira/js';

import { encode, decode, type OpaqueIDString } from './Encoder';

const SYMBOL_GLOBAL_ID = Symbol.for('graphql_global_id');

export function fromGlobalId(opaqueID: OpaqueIDString): string {
  const decodedGlobalID = decode(opaqueID);
  const delimiterPos = decodedGlobalID.indexOf(':');
  if (delimiterPos === -1) {
    throw new Error(`ID '${opaqueID}' is not valid opaque value.`);
  }
  return decodedGlobalID.substring(delimiterPos + 1);
}

export function toGlobalId(type: string, id: string | number): OpaqueIDString {
  return encode(`${type}:${id}`);
}

export function isTypeOf(type: string, opaqueID: mixed): boolean {
  if (typeof opaqueID !== 'string') {
    return false;
  }
  const decodedGlobalID = decode(((opaqueID: any): OpaqueIDString));
  const delimiterPos = decodedGlobalID.indexOf(':');
  if (delimiterPos === -1) {
    throw new Error(`ID '${opaqueID}' is not valid opaque value.`);
  }
  const unmaskedType = decodedGlobalID.substring(0, delimiterPos);
  return unmaskedType === type;
}

/**
 * Creates the configuration for an id field on a node, using `toGlobalId` to
 * construct the ID from the provided typename. The type-specific ID is fetched
 * by calling idFetcher on the object.
 */
export default function globalIdField(
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  idFetcher: (object: any, context: any, info: GraphQLResolveInfo) => string | number,
  // Unmasked ID fetcher is optional and it will allow you to overwrite how
  // does public ID actually look like. It's because opaque ID may be quite
  // complex internally but unmasked ID can be still simply represented.
  // Please not that unmasked ID should not be used as a globally unique
  // identifier (use original opaque ID instead).
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  unmaskedIdFetcher?: (object: any, context: any, info: GraphQLResolveInfo) => string | number,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run Flow.
   */
): GraphQLFieldConfig<any, any> {
  return {
    description:
      'The globally unique ID of an object. You can unmask this ID to get ' +
      'original value but please note that this unmasked ID is not globally ' +
      'unique anymore and therefore it cannot be used as a cache key.',

    // ID should be always non-null. This is an intentional exception to our eslint rule.
    // eslint-disable-next-line adeira/only-nullable-fields
    type: new GraphQLNonNull(GraphQLID),
    args: {
      opaque: {
        type: GraphQLBoolean,
        defaultValue: true,
      },
    },
    resolve: (obj, args, context, info) => {
      const id = idFetcher(obj, context, info);

      // We cannot return null because of `GraphQLNonNull` and it is not OK
      // to return opaque identifier containing `null` values because it
      // indicates failure but it's not visible from outside (and it
      // generates duplicate false keys). So we have to throw here.
      invariant(id !== undefined, 'Global ID cannot be undefined.');
      invariant(id !== null, 'Global ID cannot be null.');

      if (args.opaque === true) {
        // this should always be the default in our system
        return toGlobalId(info.parentType.name, id);
      }

      return unmaskedIdFetcher ? unmaskedIdFetcher(obj, context, info) : id;
    },
    // $FlowIssue[invalid-computed-prop]: https://github.com/facebook/flow/issues/3258
    [SYMBOL_GLOBAL_ID]: true,
  };
}
