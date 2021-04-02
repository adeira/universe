// @flow strict

import Changeset from '../Changeset';

export default function addTrackingData(changeset: Changeset): Changeset {
  const revision = changeset.getID();
  const tracking = `adeira-source-id: ${revision}`;
  const newDescription = `${changeset.getDescription()}\n\n${tracking}`;
  return changeset
    .withDebugMessage('ADD TRACKING DATA: "%s"', tracking)
    .withDescription(newDescription.trim());
}
