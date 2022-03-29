// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import { Badge, Tooltip } from '@adeira/sx-design';

export default function PositionAvailableBadge(): Node {
  return (
    <Tooltip
      title={
        <fbt desc="available job badge description">
          You can apply in our Talent Pool in case you are interested.
        </fbt>
      }
    >
      {/* $FlowFixMe[incompatible-type]: Badge component currently doesn't support this type of React children */}
      <Badge tint="success">
        ✅{' '}
        <strong>
          <fbt desc="available job badge text">Available</fbt>
        </strong>{' '}
        ✅
      </Badge>
    </Tooltip>
  );
}
