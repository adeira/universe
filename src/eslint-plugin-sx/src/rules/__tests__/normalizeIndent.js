// @flow strict

export default function normalizeIndent(strings: $ReadOnlyArray<string>): string {
  const codeLines = strings[0].split('\n');
  const leftPadding = codeLines[1].match(/\s+/)?.[0] ?? '';
  return codeLines.map((line) => line.substr(leftPadding.length)).join('\n');
}
