// @flow strict

export default function rangeMap<T>(n: number, fn: (i: number) => T): $ReadOnlyArray<T> {
  const arr: Array<T> = [];
  while (n > arr.length) {
    arr.push(fn(arr.length));
  }
  return arr;
}
