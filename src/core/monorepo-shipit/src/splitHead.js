// @flow strict

export default function splitHead(subject: string, separator: string): [string, string] {
  const pos = subject.indexOf(separator);
  const head = subject.substr(0, pos);
  const tail = subject.substr(pos + 1);
  return [head, tail];
}
