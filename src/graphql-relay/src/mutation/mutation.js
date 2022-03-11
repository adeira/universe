/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLFieldConfig,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLInputFieldConfigMap,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLFieldConfigMap,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLResolveInfo,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type Thunk,
} from 'graphql';

/* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
 * GraphQL to version 16.x. To see the error delete this comment and run Flow.
 */
type mutationFn = (object: any, ctx: any, info: GraphQLResolveInfo) => Promise<any> | any;

/* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
 * GraphQL to version 16.x. To see the error delete this comment and run Flow.
 */
function resolveMaybeThunk<T>(thingOrThunk: Thunk<T>): T {
  return typeof thingOrThunk === 'function' ? thingOrThunk() : thingOrThunk;
}

/**
 * A description of a mutation consumable by mutationWithClientMutationId
 * to create a GraphQLFieldConfig for that mutation.
 *
 * The inputFields and outputFields should not include `clientMutationId`,
 * as this will be provided automatically.
 *
 * An input object will be created containing the input fields, and an
 * object will be created containing the output fields.
 *
 * mutateAndGetPayload will receive an Object with a key for each
 * input field, and it should return an Object with a key for each
 * output field. It may return synchronously, or return a Promise.
 */
type MutationConfig = {
  name: string,
  description?: string,
  deprecationReason?: string,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  inputFields: Thunk<GraphQLInputFieldConfigMap>,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  outputFields: Thunk<GraphQLFieldConfigMap<any, any>>,
  mutateAndGetPayload: mutationFn,
  ...
};

/**
 * Returns a GraphQLFieldConfig for the mutation described by the
 * provided MutationConfig.
 */
export function mutationWithClientMutationId(
  config: MutationConfig,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run Flow.
   */
): GraphQLFieldConfig<mixed, any> {
  const { name, description, deprecationReason, inputFields, outputFields, mutateAndGetPayload } =
    config;
  const augmentedInputFields = () => ({
    ...resolveMaybeThunk(inputFields),
    clientMutationId: {
      type: GraphQLString,
    },
  });
  const augmentedOutputFields = () => ({
    ...resolveMaybeThunk(outputFields),
    clientMutationId: {
      type: GraphQLString,
    },
  });

  const outputType = new GraphQLObjectType({
    name: `${name}Payload`,
    description: 'test',
    fields: augmentedOutputFields,
  });

  const inputType = new GraphQLInputObjectType({
    name: `${name}Input`,
    description: 'test',
    fields: augmentedInputFields,
  });

  return {
    type: outputType,
    description,
    deprecationReason,
    args: {
      input: { type: new GraphQLNonNull(inputType) },
    },
    resolve: (_, { input }, context, info) => {
      return Promise.resolve(mutateAndGetPayload(input, context, info)).then((payload) => {
        payload.clientMutationId = input.clientMutationId;
        return payload;
      });
    },
  };
}
