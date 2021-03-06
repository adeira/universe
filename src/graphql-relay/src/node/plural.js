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
  type GraphQLFieldConfig,
  type GraphQLInputType,
  type GraphQLOutputType,
  type GraphQLResolveInfo,
} from 'graphql';

type PluralIdentifyingRootFieldConfig = {
  argName: string,
  inputType: GraphQLInputType,
  outputType: GraphQLOutputType,
  resolveSingleInput: (input: any, context: any, info: GraphQLResolveInfo) => ?any,
  description?: ?string,
  ...
};

export function pluralIdentifyingRootField(
  config: PluralIdentifyingRootFieldConfig,
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
