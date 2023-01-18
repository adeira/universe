// @flow

import mdnData from 'mdn-data';
import { definitionSyntax } from 'css-tree';
import { warning } from '@adeira/js';

import { FLOW_TYPE_NUMBER, FLOW_TYPE_STRING } from './flowTypes';

let panicCounter = 1;

// https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax#Summary
export default function collectTypes(syntax: string): null | Set<string | symbol> {
  const flowTypes = new Set<string | symbol>();

  try {
    const ast = definitionSyntax.parse(syntax);
    definitionSyntax.walk(ast, function enter(node): void {
      if (node.type === 'Keyword') {
        flowTypes.add(node.name);
      } else if (node.type === 'Type') {
        if (['length'].includes(node.name)) {
          // Length can be Flow type of a number (unitless number converted to PX) or with some
          // explicit unit (therefore string), see: https://developer.mozilla.org/en-US/docs/Web/CSS/length
          flowTypes.add(FLOW_TYPE_NUMBER);
          flowTypes.add(FLOW_TYPE_STRING);
        } else if (['integer', 'number'].includes(node.name)) {
          // number primitive
          flowTypes.add(FLOW_TYPE_NUMBER);
        } else if (
          [
            'angle',
            'angle-percentage',
            'color',
            'image',
            'percentage',
            'ratio',
            'string',
            'time',
          ].includes(node.name)
        ) {
          // string primitive
          flowTypes.add(FLOW_TYPE_STRING);
        } else if (
          [
            'alpha-value',
            'blend-mode',
            'compat-auto',
            'length-percentage',
            'line-style',
            'line-width',
          ].includes(node.name)
        ) {
          // expand additional nested (simple) syntaxes
          const expandedTypes = collectTypes(mdnData.css.syntaxes[node.name].syntax) ?? [];
          for (const expandedType of expandedTypes) {
            flowTypes.add(expandedType);
          }
        } else {
          throw node;
        }
      } else if (node.type === 'Group') {
        if (node.combinator === '|' || node.combinator === ' ') {
          for (const term of node.terms) {
            enter(term);
          }
        } else {
          throw node;
        }
      } else if (node.type === 'Multiplier') {
        if (node.comma === true) {
          // multiplier "#" implies the resulting Flow type must be a string because the values can repeat
          flowTypes.add(FLOW_TYPE_STRING);
        } else {
          throw node;
        }
      } else {
        throw node;
      }
    });

    return flowTypes;
  } catch (node) {
    warning(false, '❌ PANIC %s (unsupported %s): %s', panicCounter++, node.type, syntax);
    return null;
  }
}
