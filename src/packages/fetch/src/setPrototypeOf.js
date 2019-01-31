// @flow

/**
 * Necessary for Android version of React Native which doesn't support 'Object.setPrototypeOf'.
 *
 * @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#Polyfill
 */
export default function setPrototypeOf(obj: Object, prototype: Object) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(obj, prototype);
  }

  obj.__proto__ = prototype; // eslint-disable-line no-proto
  return obj;
}
