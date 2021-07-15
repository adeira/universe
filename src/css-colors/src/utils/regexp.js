// @flow strict

// https://developer.mozilla.org/en-US/docs/Web/CSS/number
export const _number = '[+-]?\\d*(?:\\.\\d+)?(?:e[+-]?\\d+)?';

// https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
export const _percentage = `${_number}%`;

// https://developer.mozilla.org/en-US/docs/Web/CSS/angle
export const _angle = `${_number}(?:deg|grad|rad|turn)?`;

// Helper functions to construct complex regular expressions:

export const _optional = (arr: $ReadOnlyArray<string>, captureGroupName?: string): string => {
  return [
    captureGroupName != null ? `(?<${captureGroupName}>` : '(?:', // group start
    ...arr,
    ')?',
  ].join('');
};

export const _or = (arr: $ReadOnlyArray<string>, captureGroupName?: string): string => {
  return [
    captureGroupName != null ? `(?<${captureGroupName}>` : '(?:', // group start
    arr.join('|'),
    ')',
  ].join('');
};

export const _spaceOrComma: string = _or(['\\s', ',\\s?']);
