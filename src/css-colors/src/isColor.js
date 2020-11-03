// @flow strict

import cssColorNames from './cssColorNames';

const _optional = (arr) => {
  return ['(?:', ...arr, ')?'].join('');
};

const _or = (arr) => {
  return ['(?:', arr.join('|'), ')'].join('');
};

const _spaceOrComma = _or(['\\s', ',\\s?']);

// https://developer.mozilla.org/en-US/docs/Web/CSS/number
export const _number = '[+-]?\\d*(?:\\.\\d+)?(?:e[+-]?\\d+)?';
// https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
const _percentage = `${_number}%`;
// https://developer.mozilla.org/en-US/docs/Web/CSS/angle
const _angle = `${_number}(?:deg|grad|rad|turn)?`;

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Syntax
function isRGBA(value: string): boolean %checks {
  return new RegExp(
    [
      '^rgba?\\(',
      _or([_number, _percentage]), // red
      _spaceOrComma,
      _or([_number, _percentage]), // green
      _spaceOrComma,
      _or([_number, _percentage]), // blue
      _optional([
        _or(['\\s?/\\s?', ',\\s?']), // " / " or comma
        _or([_number, _percentage]), // alpha
      ]),
      '\\)$',
    ].join(''),
    'i',
  ).test(value);
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Syntax
function isHSLA(value: string): boolean %checks {
  return new RegExp(
    [
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
    ].join(''),
    'i',
  ).test(value);
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
export default function isColor(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  return (
    value === 'transparent' ||
    value === 'currentcolor' ||
    cssColorNames.has(value) || // keyword values
    /^#[0-9a-f]{3}$/i.test(value) || // RGB hexadecimal shorthand
    /^#[0-9a-f]{4}$/i.test(value) || // RGB hexadecimal shorthand (with alpha)
    /^#[0-9a-f]{6}$/i.test(value) || // RGB hexadecimal full
    /^#[0-9a-f]{8}$/i.test(value) || // RGB hexadecimal full (with alpha)
    isRGBA(value) || // RGB[A] functional
    isHSLA(value) // HSL[A] functional
  );
}
