// @flow

import type { CallExpression } from './types/CallExpression';
import type { Identifier } from './types/Identifier';
import type { ImportDeclaration } from './types/ImportDeclaration';
import type { ImportDefaultSpecifier } from './types/ImportDefaultSpecifier';
import type { ImportSpecifier } from './types/ImportSpecifier';
import type { NewExpression } from './types/NewExpression';
import type { Program } from './types/Program';
import type { Property } from './types/Property';
import type { VariableDeclarator } from './types/VariableDeclarator';

// Inspiration (but obviously a different tool):
// https://github.com/babel/babel/blob/08c7280167a8dd7696c16ac70e36d5d3120962a9/packages/babel-parser/src/types.js
export type Node = any; // TODO

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
  +'BlockComment'?: (
    node: any, // TODO
  ) => void,
  +'CallExpression'?: (node: CallExpression) => void,
  +'Identifier'?: (node: Identifier) => void,
  +'ImportDeclaration'?: (node: ImportDeclaration) => void,
  +'ImportDefaultSpecifier'?: (node: ImportDefaultSpecifier) => void,
  +'ImportSpecifier'?: (node: ImportSpecifier) => void,
  +'JSXExpressionContainer'?: (
    node: any, // TODO
  ) => void,
  +'LineComment'?: (
    node: any, // TODO
  ) => void,
  +'NewExpression'?: (node: NewExpression) => void,
  +'NewExpression:exit'?: (node: NewExpression) => void,
  +'Program'?: (node: Program) => void,
  +'Program:exit'?: (node: Program) => void,
  +'Property'?: (node: Property) => void,
  +'Property:exit'?: (node: Property) => void,
  +'VariableDeclarator'?: (node: VariableDeclarator) => void,
|};

export type EslintRule = {|
  +meta?: {|
    +type?: 'problem' | 'suggestion' | 'layout',
    +docs?: {|
      +description?: string,
      +category?: string,
      +recommended?: boolean,
    |},
    +fixable?: boolean,
    +schema?: $ReadOnlyArray<empty>,
  |},
  +create: (Context) => ASTNodes,
|};
