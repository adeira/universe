// @flow strict

import {
  _comma,
  _group,
  _number,
  _optionalGroup,
  _or,
  _percentage,
  _space,
  _spaceOrComma,
} from './regexp';

export const RGBA_PATTERN_MATCH: string = [
  '^rgba?\\(',
  _or([_number, _percentage], 'R'), // red
  _spaceOrComma,
  _or([_number, _percentage], 'G'), // green
  _spaceOrComma,
  _or([_number, _percentage], 'B'), // blue
  _optionalGroup([
    _or(['\\s?/\\s?', ',\\s?']), // " / " or comma
    _or([_number, _percentage], 'A'), // alpha
  ]),
  '\\)$',
].join('');

export const RGBA_PATTERN_TEST: string = [
  '^rgba?\\(',
  _or([
    // Modern format:
    _group([
      _or([
        _group([
          _percentage, // R (0% - 100%)
          _space,
          _percentage, // G (0% - 100%)
          _space,
          _percentage, // B (0% - 100%)
        ]),
        _group([
          _number, // R (0 - 255)
          _space,
          _number, // G (0 - 255)
          _space,
          _number, // B (0 - 255)
        ]),
      ]),
      _optionalGroup([
        '\\s?/\\s?', // " / "
        _or([_number, _percentage]), // alpha
      ]),
    ]),

    // Legacy format:
    _group([
      _or([
        _group([
          _percentage, // R (0% - 100%)
          _comma,
          _percentage, // G (0% - 100%)
          _comma,
          _percentage, // B (0% - 100%)
        ]),
        _group([
          _number, // R (0 - 255)
          _comma,
          _number, // G (0 - 255)
          _comma,
          _number, // B (0 - 255)
        ]),
      ]),
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
 * rgb() = rgb( <percentage>{3} [ / <alpha-value> ]? ) |
 *  rgb( <number>{3} [ / <alpha-value> ]? )
 * <alpha-value> = <number> | <percentage>
 * ```
 *
 * For legacy reasons, rgb() also supports an alternate syntax that separates all of its arguments
 * with commas:
 *
 * ```
 * rgb() = rgb( <percentage>#{3} , <alpha-value>? ) |
 *  rgb( <number>#{3} , <alpha-value>? )
 * ```
 *
 * Also for legacy reasons, an rgba() function also exists, with an identical grammar and behavior to rgb().
 *
 * See: https://www.w3.org/TR/css-color-4/#numeric-srgb
 */
export default function isRGBA(value: string): boolean {
  return new RegExp(RGBA_PATTERN_TEST, 'i').test(value);
}
