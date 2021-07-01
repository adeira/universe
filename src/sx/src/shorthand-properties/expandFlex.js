/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
 */

import { isNumeric } from '@adeira/js';

import StyleCollectorNode from '../StyleCollectorNode';

export default function expandFlex(
  propertyName: 'flex',
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  if (typeof propertyValue !== 'string') {
    // could not be expanded
    return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
  }

  // Initial values:
  // - flex-grow: 0
  // - flex-shrink: 1
  // - flex-basis: auto
  const chunks = propertyValue.split(/\s/);
  if (chunks.length === 1) {
    if (isNumeric(chunks[0])) {
      return [
        new StyleCollectorNode('flexGrow', chunks[0], hashSeed),
        new StyleCollectorNode('flexShrink', 1, hashSeed),
        new StyleCollectorNode('flexBasis', 0, hashSeed),
      ];
    } else if (chunks[0] === 'initial') {
      return [
        new StyleCollectorNode('flexGrow', 0, hashSeed),
        new StyleCollectorNode('flexShrink', 1, hashSeed),
        new StyleCollectorNode('flexBasis', 'auto', hashSeed),
      ];
    } else if (chunks[0] === 'auto') {
      return [
        new StyleCollectorNode('flexGrow', 1, hashSeed),
        new StyleCollectorNode('flexShrink', 1, hashSeed),
        new StyleCollectorNode('flexBasis', 'auto', hashSeed),
      ];
    } else if (chunks[0] === 'none') {
      return [
        new StyleCollectorNode('flexGrow', 0, hashSeed),
        new StyleCollectorNode('flexShrink', 0, hashSeed),
        new StyleCollectorNode('flexBasis', 'auto', hashSeed),
      ];
    }
    return [
      new StyleCollectorNode('flexGrow', 0, hashSeed),
      new StyleCollectorNode('flexShrink', 1, hashSeed),
      new StyleCollectorNode('flexBasis', chunks[0], hashSeed),
    ];
  } else if (chunks.length === 2) {
    if (isNumeric(chunks[1])) {
      return [
        new StyleCollectorNode('flexGrow', chunks[0], hashSeed),
        new StyleCollectorNode('flexShrink', chunks[1], hashSeed),
        new StyleCollectorNode('flexBasis', 'auto', hashSeed),
      ];
    }
    return [
      new StyleCollectorNode('flexGrow', chunks[0], hashSeed),
      new StyleCollectorNode('flexShrink', 1, hashSeed),
      new StyleCollectorNode('flexBasis', chunks[1], hashSeed),
    ];
  }
  return [
    new StyleCollectorNode('flexGrow', chunks[0], hashSeed),
    new StyleCollectorNode('flexShrink', chunks[1], hashSeed),
    new StyleCollectorNode('flexBasis', chunks[2], hashSeed),
  ];
}
