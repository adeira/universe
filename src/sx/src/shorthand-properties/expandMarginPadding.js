/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Margin_and_Padding_Properties
 */

import { invariant } from '@adeira/js';

import StyleCollectorNode from '../StyleCollectorNode';

function isLogicalProperty(propertyName) {
  return propertyName.endsWith('Block') || propertyName.endsWith('Inline');
}

/**
 * Margin -> Margin Top/Right/Bottom/Left
 * Margin Block -> Margin Block Start/End
 * Margin Inline -> Margin Inline Start/End
 *
 * Padding -> Padding Top/Right/Bottom/Left
 * Padding Block -> Padding Block Start/End
 * Padding Inline -> Padding Inline Start/End
 */
export default function expandMarginPadding(
  propertyName:
    | 'margin'
    | 'marginBlock'
    | 'marginInline'
    | 'padding'
    | 'paddingBlock'
    | 'paddingInline',
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  function getExpandedNodes(a, b, c, d) {
    if (isLogicalProperty(propertyName)) {
      return [
        new StyleCollectorNode(`${propertyName}Start`, a, hashSeed),
        new StyleCollectorNode(`${propertyName}End`, b, hashSeed),
      ];
    }
    return [
      new StyleCollectorNode(`${propertyName}Top`, a, hashSeed),
      new StyleCollectorNode(`${propertyName}Right`, b, hashSeed),
      new StyleCollectorNode(`${propertyName}Bottom`, c, hashSeed),
      new StyleCollectorNode(`${propertyName}Left`, d, hashSeed),
    ];
  }

  if (typeof propertyValue === 'string') {
    const chunks = propertyValue.split(/\s+/);
    if (chunks.length === 1) {
      return getExpandedNodes(chunks[0], chunks[0], chunks[0], chunks[0]);
    } else if (chunks.length === 2) {
      return getExpandedNodes(chunks[0], chunks[1], chunks[0], chunks[1]);
    } else if (chunks.length === 3) {
      invariant(
        isLogicalProperty(propertyName) === false,
        'Logical property "%s" cannot have more than 2 values (got 3: "%s").',
        propertyName,
        propertyValue,
      );
      return getExpandedNodes(chunks[0], chunks[1], chunks[2], chunks[1]);
    } else if (chunks.length === 4) {
      invariant(
        isLogicalProperty(propertyName) === false,
        'Logical property "%s" cannot have more than 2 values (got 4: "%s").',
        propertyName,
        propertyValue,
      );
      return getExpandedNodes(chunks[0], chunks[1], chunks[2], chunks[3]);
    }
  } else if (typeof propertyValue === 'number') {
    return getExpandedNodes(propertyValue, propertyValue, propertyValue, propertyValue);
  }

  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
