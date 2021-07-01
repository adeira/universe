// @flow

import expandBackground from './shorthand-properties/expandBackground';
import expandBorder from './shorthand-properties/expandBorder';
import expandFlex from './shorthand-properties/expandFlex';
import expandMarginPadding from './shorthand-properties/expandMarginPadding';
import expandOverflow from './shorthand-properties/expandOverflow';
import StyleCollectorNode from './StyleCollectorNode';

/**
 * Purpose of this function is to expand shorthand CSS properties which could cause conflicts
 * when defined together. Imagine the following example:
 *
 * ```
 * const styles = sx.create({
 *   primary: { marginTop: '10px' },
 *   button: { margin: 0 },
 * });
 * ```
 *
 * It could generate the following CSS:
 *
 * ```
 * .c0 { margin-top: 10px }
 * .c1 { margin: 0px }
 * ```
 *
 * That would be a tricky situation because CSS specificity depends on the CSS definition order
 * and therefore the top margin would be always overwritten when used together. Instead, we
 * expand the shorthand properties into something like this:
 *
 * ```
 * .c0 { margin-top: 10px }   << primary
 * .c1 { margin-top: 0px }    << button
 * .c2 { margin-right: 0px }
 * .c3 { margin-bottom: 0px }
 * .c4 { margin-left: 0px }
 * ```
 *
 * This way SX is not dependent on the CSS rules insertion order but rather on the markup.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
 */
export default function expandShorthandProperties(
  propertyName: string,
  propertyValue: string | number,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  // TODO (https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#See_also):
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/animation
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/font
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/transition
  //  - ...

  if (propertyName === 'background') {
    return expandBackground(propertyName, propertyValue, hashSeed);
  } else if (
    propertyName === 'border' ||
    propertyName === 'borderBlock' ||
    propertyName === 'borderInline'
  ) {
    return expandBorder(propertyName, propertyValue, hashSeed);
  } else if (propertyName === 'margin' || propertyName === 'padding') {
    return expandMarginPadding(propertyName, propertyValue, hashSeed);
  } else if (propertyName === 'overflow') {
    return expandOverflow(propertyName, propertyValue, hashSeed);
  } else if (propertyName === 'flex') {
    return expandFlex(propertyName, propertyValue, hashSeed);
  }

  // could not be expanded
  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
