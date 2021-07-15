// @flow strict

import { _angle, _or, _number, _percentage, _optional, _spaceOrComma } from './regexp';

export const HSLA_PATTERN: string = [
  '^hsla?\\(',
  _angle, // hue
  _spaceOrComma,
  _or([_number, _percentage]), // saturation
  _spaceOrComma,
  _or([_number, _percentage]), // lightness
  _optional([
    _or(['\\s?/\\s?', ',\\s?']), // " / " or comma
    _or([_number, _percentage]), // alpha
  ]),
  '\\)$',
].join('');

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Syntax
export default function isHSLA(value: string): boolean {
  return new RegExp(HSLA_PATTERN, 'i').test(value);
}
