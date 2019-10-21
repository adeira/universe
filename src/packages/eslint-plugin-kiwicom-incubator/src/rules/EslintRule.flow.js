// @flow strict

type Node = {|
  +name: string,
  +key: {|
    +name: string,
  |},
  +value: string,
  +callee: {|
    +name: string,
  |},
  +parent: {|
    +callee?: {|
      +name: string,
    |},
  |},
|};

type SourceCode = {|
  +getAllComments: () => $ReadOnlyArray<Node>,
|};

type Context = {|
  +report: ((Node, string) => void) & (({ +node: Node, ... }) => void),
  +getSourceCode: () => SourceCode,
|};

type ASTNodes = {|
  +'NewExpression:exit'?: (node: Node) => void,
  +'Property:exit'?: (node: Node) => void,
  +BlockComment?: (node: Node) => void,
  +CallExpression?: (node: Node) => void,
  +Identifier?: (node: Node) => void,
  +LineComment?: (node: Node) => void,
  +NewExpression?: (node: Node) => void,
  +Program?: (node: Node) => void,
  +Property?: (node: Node) => void,
|};

export type EslintRule = {|
  +meta: {|
    +docs: {|
      +description?: string,
      +category?: string,
      +recommended?: boolean,
    |},
    +fixable?: boolean,
    +schema: $ReadOnlyArray<empty>,
  |},
  +create: Context => ASTNodes,
|};
