// @flow strict

import Changeset from '../Changeset';

export default function stripDescriptions(changeset: Changeset): Changeset {
  return changeset.withDescription('');
}
