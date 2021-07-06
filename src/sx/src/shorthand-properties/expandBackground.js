/**
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Background_Properties
 */

import { isColor } from '@adeira/css-colors';

import StyleCollectorNode from '../StyleCollectorNode';

export default function expandBackground(
  propertyName: 'background',
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  // Note: we currently ignore more complex syntaxes at this moment
  // see: https://developer.mozilla.org/en-US/docs/Web/CSS/background#Formal_syntax
  const background = new Map([
    ['backgroundImage', new StyleCollectorNode('backgroundImage', 'none', hashSeed)],
    ['backgroundPosition', new StyleCollectorNode('backgroundPosition', '0% 0%', hashSeed)],
    ['backgroundSize', new StyleCollectorNode('backgroundSize', 'auto auto', hashSeed)],
    ['backgroundRepeat', new StyleCollectorNode('backgroundRepeat', 'repeat', hashSeed)],
    ['backgroundOrigin', new StyleCollectorNode('backgroundOrigin', 'padding-box', hashSeed)],
    ['backgroundClip', new StyleCollectorNode('backgroundClip', 'border-box', hashSeed)],
    ['backgroundAttachment', new StyleCollectorNode('backgroundAttachment', 'scroll', hashSeed)],
    ['backgroundColor', new StyleCollectorNode('backgroundColor', 'transparent', hashSeed)],
  ]);

  if (isColor(propertyValue)) {
    background.set(
      'backgroundColor',
      new StyleCollectorNode('backgroundColor', propertyValue, hashSeed),
    );
    return Array.from(background.values());
  } else if (propertyValue === 'none') {
    background.set(
      'backgroundImage',
      new StyleCollectorNode('backgroundImage', propertyValue, hashSeed),
    );
    return Array.from(background.values());
  }

  // could not be expanded
  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
