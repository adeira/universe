// @flow strict

/*:: type AnyObject = { +[key: string]: mixed }; */

export default function isObject(value: mixed) /*: value is AnyObject */ {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
