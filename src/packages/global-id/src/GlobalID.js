// @flow

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  type GraphQLResolveInfo,
  type GraphQLFieldConfig,
} from 'graphql';
import { Buffer } from 'buffer';

opaque type Base64String = string;

function base64(i: string): Base64String {
  // use Buffer polyfill here to ensure it works even in environment without
  // native Buffer implementation (RN world)
  return Buffer.from(i, 'utf8').toString('base64');
}

function toGlobalId(type: string, id: string | number): string {
  return base64([type, id].join(':'));
}

/**
 * Creates the configuration for an id field on a node, using `toGlobalId` to
 * construct the ID from the provided typename. The type-specific ID is fetched
 * by calling idFetcher on the object.
 */
export default function globalIdField(
  idFetcher: (
    object: any,
    context: any,
    info: GraphQLResolveInfo,
  ) => string | number,
  // Unmasked ID fetcher is optional and it will allow you to overwrite how
  // does public ID actually look like. It's because opaque ID may be quite
  // complex internally but unmasked ID can be still simply represented.
  // Please not that unmasked ID should not be used as a globally unique
  // identifier (use original opaque ID instead).
  unmaskedIdFetcher?: (
    object: any,
    context: any,
    info: GraphQLResolveInfo,
  ) => string | number,
): GraphQLFieldConfig<*, *> {
  return {
    description:
      'The globally unique ID of an object. You can unmask this ID to get ' +
      'original value but please note that this unmasked ID is not globally ' +
      'unique anymore and therefore it cannot be used as a cache key.',

    // ID should be always non-null. This is an intentional exception to our eslint rule.
    // eslint-disable-next-line kiwi-graphql/only-nullable-fields
    type: new GraphQLNonNull(GraphQLID),
    args: {
      opaque: {
        type: GraphQLBoolean,
        defaultValue: true,
      },
    },
    resolve: (obj, args, context, info) => {
      const id = idFetcher(obj, context, info);

      if (id === undefined || id === null) {
        // we cannot return null because of `GraphQLNonNull` and it is not ok
        // to return opaque identifier containing `null` values because it
        // indicates failure but it's not visible from outside (and it
        // generates duplicate false keys)
        throw new Error('Global ID cannot be null or undefined.');
      }

      if (args.opaque === true) {
        // this should always be the default in our system
        return toGlobalId(info.parentType.name, id);
      }

      return unmaskedIdFetcher ? unmaskedIdFetcher(obj, context, info) : id;
    },
  };
}
