// @flow strict

type Property = {|
  +type: 'Property',
  +key: {|
    +name: string,
  |},
  +value: Literal | ObjectExpression,
|};

type Literal = {|
  +type: 'Literal',
  +value: mixed,
|};

type ObjectExpression = {|
  +type: 'ObjectExpression',
  +properties: $ReadOnlyArray<Property>,
|};

export type Node = {|
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
  +arguments?: $ReadOnlyArray<?(ObjectExpression | Literal)>,
  +importKind: string,
  +specifiers: $ReadOnlyArray<{|
    +imported: Node,
    +importKind: string,
    +start: number,
    +end: number,
    +type: string,
  |}>,
  +source: Node,
|};

type SourceCode = {|
  +getAllComments: () => $ReadOnlyArray<Node>,
|};

type Context = {|
  +report: ((Node, string) => void) & (({ +node: Node, ... }) => void),
  +getSourceCode: () => SourceCode,
  +getFilename: () => string,
  +settings: { [key: string]: mixed, ... },
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
  +ImportDeclaration?: (node: Node) => void,
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
