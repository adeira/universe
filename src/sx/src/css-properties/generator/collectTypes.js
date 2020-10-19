// @flow

import { warning } from '@adeira/js';
import { definitionSyntax } from 'css-tree';

import { FLOW_TYPE_NUMBER, FLOW_TYPE_STRING } from './flowTypes';

export default function collectTypes(syntax: string): null | Set<string | symbol> {
  const flowTypes = new Set();

  try {
    const ast = definitionSyntax.parse(syntax);
    definitionSyntax.walk(ast, function enter(node) {
      if (node.type === 'Keyword') {
        flowTypes.add(node.name);
      } else if (node.type === 'Type') {
        if (['length', 'length-percentage'].includes(node.name)) {
          // Length can be Flow type of a number (unitless number converted to PX) or with some
          // explicit unit (therefore string), see: https://developer.mozilla.org/en-US/docs/Web/CSS/length
          flowTypes.add(FLOW_TYPE_NUMBER);
          flowTypes.add(FLOW_TYPE_STRING);
        } else if (['integer', 'number'].includes(node.name)) {
          flowTypes.add(FLOW_TYPE_NUMBER);
        } else if (
          ['angle', 'angle-percentage', 'percentage', 'ratio', 'time', 'color'].includes(node.name)
        ) {
          flowTypes.add(FLOW_TYPE_STRING);
        } else {
          throw node;
        }
      } else if (node.type === 'Group') {
        if (node.combinator !== '|' && node.combinator !== ' ') {
          throw node;
        }
      } else if (node.type === 'Multiplier') {
        if (node.comma === true) {
          // multiplier "#" implies the resulting Flow type must be a string becuase the values can repeat
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
    warning(false, '❌ PANIC (unsupported %s): %s', node.type, syntax);
    return null;
  }
}
