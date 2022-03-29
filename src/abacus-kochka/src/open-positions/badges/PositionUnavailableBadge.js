// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import { Badge, Tooltip } from '@adeira/sx-design';

export default function PositionUnavailableBadge(): Node {
  return (
    <Tooltip
      title={
        <fbt desc="unavailable job badge description">
          This position is currently unavailable, however, we encourage you to submit your data in
          our Talent Pool in case you are interested and we might get back to you.
        </fbt>
      }
    >
      {/* $FlowFixMe[incompatible-type]: Badge component currently doesn't support this type of React children */}
      <Badge tint="warning">
        🙅 <fbt desc="unavailable job badge text">Unavailable</fbt> 🙅
      </Badge>
    </Tooltip>
  );
}
