// @flow strict

import Changeset from './Changeset';
import splitHead from './splitHead';

export default function parsePatchHeader(header: string): Changeset {
  const [rawEnvelope, rawBody] = splitHead(header, '\n\n');

  const description = [];
  const coAuthorLines = [];

  // Co-authored-by must be the absolute last thing in the message so we separate it here from the
  // description and compose it later correctly (to add the `adeira-source-id` label correctly).
  for (const line of rawBody.trim().split('\n')) {
    if (line.startsWith('Co-authored-by:')) {
      coAuthorLines.push(line);
    } else {
      description.push(line);
    }
  }

  let changeset = new Changeset()
    .withDescription(description.join('\n'))
    .withCoAuthorLines(coAuthorLines);

  const envelope = rawEnvelope.replace(/(?:\n\t|\n )/, ' ');
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
