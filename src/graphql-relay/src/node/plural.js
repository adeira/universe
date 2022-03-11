/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* eslint-disable adeira/only-nullable-fields */

import {
  GraphQLList,
  GraphQLNonNull,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLFieldConfig,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLInputType,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLOutputType,
  /* $FlowFixMe[untyped-type-import] This comment suppresses an error when
   * upgrading GraphQL to version 16.x. To see the error delete this comment
   * and run Flow. */
  type GraphQLResolveInfo,
} from 'graphql';

type PluralIdentifyingRootFieldConfig = {
  argName: string,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  inputType: GraphQLInputType,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  outputType: GraphQLOutputType,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run
   * Flow. */
  resolveSingleInput: (input: any, context: any, info: GraphQLResolveInfo) => ?any,
  description?: ?string,
  ...
};

export function pluralIdentifyingRootField(
  config: PluralIdentifyingRootFieldConfig,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * GraphQL to version 16.x. To see the error delete this comment and run Flow.
   */
): GraphQLFieldConfig<mixed, any> {
  const inputArgs = {};
  let inputType = config.inputType;
  if (inputType instanceof GraphQLNonNull) {
    inputType = inputType.ofType;
  }
  inputArgs[config.argName] = {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(inputType))),
  };
  return {
    description: config.description,
    type: new GraphQLList(config.outputType),
    args: inputArgs,
    resolve(obj, args, context, info) {
      const inputs = args[config.argName];
      return Promise.all(
        inputs.map((input) => Promise.resolve(config.resolveSingleInput(input, context, info))),
      );
    },
  };
}
