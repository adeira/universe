// @flow strict

type List = Array<string>;

export type ParsedConfig = {|
  declarations: List,
  ignore: List,
  include: List,
  libs: List,
  lints: $FlowFixMe,
  options: $FlowFixMe,
  rollouts: $FlowFixMe,
  strict: List,
  untyped: List,
  version: $FlowFixMe,
|};
