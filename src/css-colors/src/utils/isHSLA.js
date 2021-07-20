// @flow strict

import {
  _angle,
  _comma,
  _group,
  _number,
  _optionalGroup,
  _or,
  _percentage,
  _space,
} from './regexp';

export const HSLA_PATTERN_TEST: string = [
  '^hsla?\\(',
  _or([
    _group([
      _angle, // hue
      _space,
      _percentage, // saturation
      _space,
      _percentage, // lightness
      _optionalGroup([
        '\\s?/\\s?', // " / "
        _or([_number, _percentage]), // alpha
      ]),
    ]),
    _group([
      _angle, // hue
      _comma,
      _percentage, // saturation
      _comma,
      _percentage, // lightness
      _optionalGroup([
        _comma,
        _or([_number, _percentage]), // alpha
      ]),
    ]),
  ]),
  '\\)$',
].join('');

/**
 * Syntax:
 *
 * ```
 * hsl() = hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? )
 * ```
 *
 * For legacy reasons, hsl() also supports an alternate syntax that separates all of its arguments
 * with commas:
 *
 * ```
 * hsl() = hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )
 * ```
 *
 * Also for legacy reasons, an hsla() function also exists, with an identical grammar and behavior to hsl().
 *
 * See: https://www.w3.org/TR/css-color-4/#the-hsl-notation
 */
export default function isHSLA(value: string): boolean {
  return new RegExp(HSLA_PATTERN_TEST, 'i').test(value);
}
