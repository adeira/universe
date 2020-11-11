// @flow strict

export default function hex3ToHex6(value: string): string {
  const r = value[1];
  const g = value[2];
  const b = value[3];

  return `#${r}${r}${g}${g}${b}${b}`;
}
