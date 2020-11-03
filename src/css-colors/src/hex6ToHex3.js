// @flow strict

export default function hex6ToHex3(value: string): string {
  const r = value[1];
  const g = value[3];
  const b = value[5];

  if (r === value[2] && g === value[4] && b === value[6]) {
    return `#${r}${g}${b}`;
  }
  return value;
}
