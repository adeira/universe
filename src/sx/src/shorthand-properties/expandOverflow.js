/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 */

import StyleCollectorNode from '../StyleCollectorNode';

export default function expandOverflow(
  propertyName: 'overflow',
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  if (typeof propertyValue !== 'string') {
    // could not be expanded
    return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
  }

  // The `overflow` property is specified as one or two keywords. If two keywords are specified,
  // the first applies to `overflow-x` and the second to `overflow-y`. Otherwise, both `overflow-x`
  // and `overflow-y` are set to the same value.
  const chunks = propertyValue.split(/\s/);
  if (chunks.length === 2) {
    return [
      new StyleCollectorNode('overflowX', chunks[0], hashSeed),
      new StyleCollectorNode('overflowY', chunks[1], hashSeed),
    ];
  }
  return [
    new StyleCollectorNode('overflowX', propertyValue, hashSeed),
    new StyleCollectorNode('overflowY', propertyValue, hashSeed),
  ];
}
