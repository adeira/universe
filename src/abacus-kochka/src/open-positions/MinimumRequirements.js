// @flow

import { fbt } from 'fbt';
import { LayoutBlock } from '@adeira/sx-design';
import type { Node } from 'react';

export default function MinimumRequirements(): Node {
  return (
    <LayoutBlock>
      <div>
        <fbt desc="minimum candidate requirements title">Minimum requirements:</fbt>
      </div>
      <ul>
        <li>
          <fbt desc="candidate requirement 1">likes cats</fbt>
        </li>
        <li>
          <fbt desc="candidate requirement 2">18+ years old</fbt>
        </li>
        <li>
          <fbt desc="candidate requirement 3">available during our opening hours</fbt>
        </li>
      </ul>
    </LayoutBlock>
  );
}
