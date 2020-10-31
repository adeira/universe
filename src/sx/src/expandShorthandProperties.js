// @flow

import StyleCollectorNode from './StyleCollectorNode';
import { isColor } from './colorNormalizer';

/**
 * Purpose of this function is to expand shorthand CSS properties which could cause conflics
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
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties
 */
export default function expandShorthandProperties(
  propertyName: string,
  propertyValue: any,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Background_Properties
  if (propertyName === 'background') {
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
    // Note: we ignore more complex syntaxes at this moment
    // see: https://developer.mozilla.org/en-US/docs/Web/CSS/background#Formal_syntax
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
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Margin_and_Padding_Properties
  if (propertyName === 'margin' || propertyName === 'padding') {
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
  }

  // TODO (inspired by React Native Web - https://github.com/necolas/react-native-web/):
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Font_Properties
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Border_Properties
  //
  //  - borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  //  - borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  //  - borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  //  - borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  //  - overflow: ['overflowX', 'overflowY'],
  //  - overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  //
  //  RNW specifics:
  //  - marginHorizontal: ['marginRight', 'marginLeft'],
  //  - marginVertical: ['marginTop', 'marginBottom'],
  //  - paddingHorizontal: ['paddingRight', 'paddingLeft'],
  //  - paddingVertical: ['paddingTop', 'paddingBottom'],

  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
