/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Margin_and_Padding_Properties
 */

import StyleCollectorNode from '../StyleCollectorNode';

export default function expandMarginPadding(
  propertyName: 'margin' | 'padding',
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  const top = `${propertyName}Top`;
  const right = `${propertyName}Right`;
  const bottom = `${propertyName}Bottom`;
  const left = `${propertyName}Left`;
  if (typeof propertyValue === 'string') {
    const chunks = propertyValue.split(/\s+/);
    if (chunks.length === 1) {
      const chunk = chunks[0];
      return [
        new StyleCollectorNode(top, chunk, hashSeed),
        new StyleCollectorNode(right, chunk, hashSeed),
        new StyleCollectorNode(bottom, chunk, hashSeed),
        new StyleCollectorNode(left, chunk, hashSeed),
      ];
    } else if (chunks.length === 2) {
      return [
        new StyleCollectorNode(top, chunks[0], hashSeed),
        new StyleCollectorNode(right, chunks[1], hashSeed),
        new StyleCollectorNode(bottom, chunks[0], hashSeed),
        new StyleCollectorNode(left, chunks[1], hashSeed),
      ];
    } else if (chunks.length === 3) {
      return [
        new StyleCollectorNode(top, chunks[0], hashSeed),
        new StyleCollectorNode(right, chunks[1], hashSeed),
        new StyleCollectorNode(bottom, chunks[2], hashSeed),
        new StyleCollectorNode(left, chunks[1], hashSeed),
      ];
    } else if (chunks.length === 4) {
      return [
        new StyleCollectorNode(top, chunks[0], hashSeed),
        new StyleCollectorNode(right, chunks[1], hashSeed),
        new StyleCollectorNode(bottom, chunks[2], hashSeed),
        new StyleCollectorNode(left, chunks[3], hashSeed),
      ];
    }
  } else if (typeof propertyValue === 'number') {
    return [
      new StyleCollectorNode(top, propertyValue, hashSeed),
      new StyleCollectorNode(right, propertyValue, hashSeed),
      new StyleCollectorNode(bottom, propertyValue, hashSeed),
      new StyleCollectorNode(left, propertyValue, hashSeed),
    ];
  }

  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
