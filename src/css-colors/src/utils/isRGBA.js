// @flow strict

import { _or, _number, _percentage, _optional, _spaceOrComma } from './regexp';

export const RGBA_PATTERN: string = [
  '^rgba?\\(',
  _or([_number, _percentage], 'R'), // red
  _spaceOrComma,
  _or([_number, _percentage], 'G'), // green
  _spaceOrComma,
  _or([_number, _percentage], 'B'), // blue
  _optional([
    _or(['\\s?/\\s?', ',\\s?']), // " / " or comma
    _or([_number, _percentage], 'A'), // alpha
  ]),
  '\\)$',
].join('');

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Syntax
export default function isRGBA(value: string): boolean {
  return new RegExp(RGBA_PATTERN, 'i').test(value);
}
