// @flow strict

import Changeset from '../Changeset';

export default function stripDescriptions(changeset: Changeset) {
  return changeset.withDescription('');
}
