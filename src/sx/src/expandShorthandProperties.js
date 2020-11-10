// @flow

import { isColor } from '@adeira/css-colors';

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
  propertyValue: any,
  hashSeed: string = '',
): $ReadOnlyArray<StyleCollectorNode> {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Background_Properties
  if (propertyName === 'background') {
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
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Border_Properties
  if (propertyName === 'border') {
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

  if (propertyName === 'overflow') {
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

  // TODO:
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/animation
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/font
  //  - https://developer.mozilla.org/en-US/docs/Web/CSS/flex
  //  - ...

  return [new StyleCollectorNode(propertyName, propertyValue, hashSeed)];
}
