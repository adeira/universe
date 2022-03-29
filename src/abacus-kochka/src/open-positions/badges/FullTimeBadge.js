// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import { Badge } from '@adeira/sx-design';

export default function FullTimeBadge(): Node {
  return (
    <Badge tint="default">
      <fbt desc="full-time badge text">Full-time</fbt>
    </Badge>
  );
}
