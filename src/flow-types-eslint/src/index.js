// @flow

import type { CallExpression } from './types/CallExpression';
import type { Identifier } from './types/Identifier';
import type { ImportDeclaration as _ImportDeclaration } from './types/ImportDeclaration';
import type { ImportDefaultSpecifier } from './types/ImportDefaultSpecifier';
import type { ImportSpecifier } from './types/ImportSpecifier';
import type { JSXAttribute } from './types/JSXAttribute';
import type { JSXExpressionContainer } from './types/JSXExpressionContainer';
import type { MemberExpression } from './types/MemberExpression';
import type { NewExpression } from './types/NewExpression';
import type { Program } from './types/Program';
import type { Property as _Property } from './types/Property';
import type { TypeAlias } from './types/TypeAlias';
import type { VariableDeclarator as _VariableDeclarator } from './types/VariableDeclarator';

// Inspiration (but obviously a different tool):
// https://github.com/babel/babel/blob/08c7280167a8dd7696c16ac70e36d5d3120962a9/packages/babel-parser/src/types.js
export type Node = any; // TODO

type SourceCode = {
  +getAllComments: () => $ReadOnlyArray<Node>,
  +text: string,
};

type Context = {
  +report: ((Node, string) => void) & (({ +node: Node, ... }) => void),
  +getSourceCode: () => SourceCode,
  +getFilename: () => string,
  +settings: { [key: string]: mixed, ... },
};

type ASTNodes = {
  +'BlockComment'?: (
    node: any, // TODO
  ) => void,
  +'CallExpression'?: (node: CallExpression) => void,
  +'Identifier'?: (node: Identifier) => void,
  +'ImportDeclaration'?: (node: _ImportDeclaration) => void,
  +'ImportDefaultSpecifier'?: (node: ImportDefaultSpecifier) => void,
  +'ImportSpecifier'?: (node: ImportSpecifier) => void,
  +'JSXAttribute'?: (node: JSXAttribute) => void,
  +'JSXExpressionContainer'?: (node: JSXExpressionContainer) => void,
  +'LineComment'?: (
    node: any, // TODO
  ) => void,
  +'MemberExpression'?: (node: MemberExpression) => void,
  +'NewExpression'?: (node: NewExpression) => void,
  +'NewExpression:exit'?: (node: NewExpression) => void,
  +'Program'?: (node: Program) => void,
  +'Program:exit'?: (node: Program) => void,
  +'Property'?: (node: _Property) => void,
  +'Property:exit'?: (node: _Property) => void,
  +'TaggedTemplateExpression'?: (node: any) => void, // TODO
  +'TypeAlias'?: (node: TypeAlias) => void,
  +'VariableDeclarator'?: (node: _VariableDeclarator) => void,
};

export type ImportDeclaration = _ImportDeclaration;
export type Property = _Property;
export type VariableDeclarator = _VariableDeclarator;

export type EslintRule = {
  +meta?: {
    +type?: 'problem' | 'suggestion' | 'layout',
    +docs?: {
      +description?: string,
      +category?: string,
      +recommended?: boolean,
      +url?: string,
      +suggestion?: boolean,
    },
    +fixable?: 'code' | 'whitespace',
    +schema?: $ReadOnlyArray<empty>,
    +messages?: { +[string]: string },
  },
  +create: (Context) => ASTNodes,
};
