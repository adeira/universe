// @flow strict

export default function isObject(value: mixed): boolean %checks {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
