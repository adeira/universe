// @flow strict

import Changeset from '../Changeset';

export default function addTrackingData(changeset: Changeset): Changeset {
  const revision = changeset.getID();
  const newDescription = `${changeset.getDescription()}\n\nadeira-source-id: ${revision}`;
  return changeset.withDescription(newDescription.trim());
}
