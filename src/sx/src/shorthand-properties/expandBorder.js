/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Border_Properties
 */

import { isColor } from '@adeira/css-colors';

import StyleCollectorNode from '../StyleCollectorNode';

export default function expandBorder(
  propertyName: 'border' | 'borderBlock' | 'borderInline',
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  // Note: we currently ignore more complex syntaxes at this moment
  // https://developer.mozilla.org/en-US/docs/Web/CSS/border#Formal_syntax
  const borderPhysical = new Map([
    // all these properties are actually shorthands as well so we should consider expanding them further
    ['borderWidth', new StyleCollectorNode('borderWidth', 'medium', hashSeed)],
    ['borderStyle', new StyleCollectorNode('borderStyle', 'none', hashSeed)],
    ['borderColor', new StyleCollectorNode('borderColor', 'currentcolor', hashSeed)],
  ]);
  const borderLogicalBlock = new Map([
    // all these properties are actually shorthands as well so we should consider expanding them further
    ['borderBlockWidth', new StyleCollectorNode('borderBlockWidth', 'medium', hashSeed)],
    ['borderBlockStyle', new StyleCollectorNode('borderBlockStyle', 'none', hashSeed)],
    ['borderBlockColor', new StyleCollectorNode('borderBlockColor', 'currentcolor', hashSeed)],
  ]);
  const borderLogicalInline = new Map([
    // all these properties are actually shorthands as well so we should consider expanding them further
    ['borderInlineWidth', new StyleCollectorNode('borderInlineWidth', 'medium', hashSeed)],
    ['borderInlineStyle', new StyleCollectorNode('borderInlineStyle', 'none', hashSeed)],
    ['borderInlineColor', new StyleCollectorNode('borderInlineColor', 'currentcolor', hashSeed)],
  ]);

  if (isColor(propertyValue)) {
    if (propertyName === 'borderBlock') {
      borderLogicalBlock.set(
        'borderBlockColor',
        new StyleCollectorNode('borderBlockColor', propertyValue, hashSeed),
      );
      return Array.from(borderLogicalBlock.values());
    } else if (propertyName === 'borderInline') {
      borderLogicalInline.set(
        'borderInlineColor',
        new StyleCollectorNode('borderInlineColor', propertyValue, hashSeed),
      );
      return Array.from(borderLogicalInline.values());
    }
    borderPhysical.set(
      'borderColor',
      new StyleCollectorNode('borderColor', propertyValue, hashSeed),
    );
    return Array.from(borderPhysical.values());
  }

  // could not be expanded
  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
