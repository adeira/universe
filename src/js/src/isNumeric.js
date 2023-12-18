// @flow strict

export default function isNumeric(value: mixed): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
