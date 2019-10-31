// @flow strict

// This is essentially a special case of `invariant` for null values.
export default function nullthrows<T>(
  x: ?T,
  message?: string = 'Got unexpected null or undefined.',
): empty | T {
  if (x == null) {
    throw new Error(message);
  }
  return x;
}
