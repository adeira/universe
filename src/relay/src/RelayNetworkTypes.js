// @flow strict

// https://github.com/facebook/relay/blob/master/packages/relay-runtime/network/RelayNetworkTypes.js

export type PayloadData = { [key: string]: mixed, ... };

export type PayloadError = {
  message: string,
  locations?: Array<{
    line: number,
    column: number,
    ...
  }>,
  // Not officially part of the spec, but used at Facebook
  severity?: 'CRITICAL' | 'ERROR' | 'WARNING',
  ...
};

export type PayloadExtensions = { [key: string]: mixed, ... };

/**
 * The shape of a GraphQL response as dictated by the
 * [spec](https://graphql.github.io/graphql-spec/June2018/#sec-Response-Format)
 */
export type GraphQLResponseWithData = {|
  +data: PayloadData,
  +errors?: Array<PayloadError>,
  +extensions?: PayloadExtensions,
  +label?: string,
  +path?: Array<string | number>,
|};

export type GraphQLResponseWithoutData = {|
  +data?: ?PayloadData,
  +errors: Array<PayloadError>,
  +extensions?: PayloadExtensions,
  +label?: string,
  +path?: Array<string | number>,
|};

export type GraphQLResponseWithExtensionsOnly = {|
  // Per https://spec.graphql.org/June2018/#sec-Errors
  // > If the data entry in the response is not present, the errors entry
  // > in the response must not be empty. It must contain at least one error
  // This means a payload has to have either a data key or an errors key:
  // but the spec leaves room for the combination of data: null plus extensions
  // since `data: null` is a *required* output if there was an error during
  // execution, but the inverse is not described in the sepc: `data: null`
  // does not necessarily indicate that there was an error.
  +data: null,
  +extensions: PayloadExtensions,
|};

export type GraphQLSingularResponse =
  | GraphQLResponseWithData
  | GraphQLResponseWithExtensionsOnly
  | GraphQLResponseWithoutData;

export type GraphQLResponse = GraphQLSingularResponse | $ReadOnlyArray<GraphQLSingularResponse>;
