// @flow strict

type INode = {||};

export type Identifier1 = {|
  ...INode,
  name: string,
|};

export type Identifier2 = {|
  ...INode,
  name: string, // writable on purpose
  +surname: string,
|};
