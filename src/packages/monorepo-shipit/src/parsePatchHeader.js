// @flow strict

import Changeset from './Changeset';
import splitHead from './splitHead';

export default function parsePatchHeader(header: string): Changeset {
  const [envelope, body] = splitHead(header, '\n\n');
  const description = body.trim();
  let changeset = new Changeset().withDescription(description);
  for (const line of envelope.split('\n')) {
    if (!line.includes(':')) {
      continue;
    }
    const [key, rawValue] = splitHead(line, ':');
    const value = rawValue.trim();
    switch (key.trim().toLowerCase()) {
      case 'from':
        changeset = changeset.withAuthor(value);
        break;
      case 'subject':
        changeset = changeset.withSubject(value.replace(/^\[PATCH] /, ''));
        break;
      case 'date':
        changeset = changeset.withTimestamp(value);
        break;
    }
  }
  return changeset;
}
