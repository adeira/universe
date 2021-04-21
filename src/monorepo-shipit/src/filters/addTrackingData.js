// @flow strict

import Changeset from '../Changeset';

export default function addTrackingData(changeset: Changeset): Changeset {
  const revision = changeset.getID();
  const tracking = `adeira-source-id: ${revision}`;

  let newDescription = `${changeset.getDescription()}\n\n${tracking}`;

  // Co-authored-by must be the absolute last thing in the message
  const coAuthorLines = changeset.getCoAuthorLines();
  if (coAuthorLines.length > 0) {
    newDescription += `\n\n${coAuthorLines.join('\n')}`;
  }

  return changeset
    .withDebugMessage('ADD TRACKING DATA: "%s"', tracking)
    .withDescription(newDescription.trim());
}
