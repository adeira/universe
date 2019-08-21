// @flow strict

export default function isNumeric(value: mixed): boolean %checks {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
