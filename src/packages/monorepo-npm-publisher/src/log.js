// @flow strict

export default function log(...message: $ReadOnlyArray<string>): void {
  console.warn(...message); // eslint-disable-line no-console
}
