/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Border_Properties
 */

import { isColor } from '@adeira/css-colors';

import StyleCollectorNode from '../StyleCollectorNode';

export default function expandBorder(
  propertyName: string,
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  // Note: we currently ignore more complex syntaxes at this moment
  // https://developer.mozilla.org/en-US/docs/Web/CSS/border#Formal_syntax
  const border = new Map([
    // all these properties are actually shorthands as well so we should consider expanding them further
    ['borderWidth', new StyleCollectorNode('borderWidth', 'medium', hashSeed)],
    ['borderStyle', new StyleCollectorNode('borderStyle', 'none', hashSeed)],
    ['borderColor', new StyleCollectorNode('borderColor', 'currentcolor', hashSeed)],
  ]);

  if (isColor(propertyValue)) {
    border.set('borderColor', new StyleCollectorNode('borderColor', propertyValue, hashSeed));
    return Array.from(border.values());
  }

  // could not be expanded
  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
