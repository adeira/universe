// @flow strict

import { invariant } from '@kiwicom/js';

import moveDirectories from './moveDirectories';
import Changeset from '../Changeset';

export default function moveDirectoriesReverse(
  changeset: Changeset,
  mapping: Map<string, string>,
): Changeset {
  const reversedMapping = new Map();
  for (const [src, dest] of mapping.entries()) {
    invariant(
      !reversedMapping.has(dest),
      'It is not possible to reverse mapping with duplicate destinations.',
    );
    reversedMapping.set(dest, src);
  }
  // subdirectories (most specific) should go first
  return moveDirectories(changeset, new Map([...reversedMapping].sort().reverse()));
}
