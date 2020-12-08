// @flow strict

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @see https://github.com/lodash/lodash/blob/e0029485ab4d97adea0cb34292afb6700309cf16/escapeRegExp.js
 */
export default function _esc(s: string): string {
  // RegExp.escape substitute
  return s.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
