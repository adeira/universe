// @flow

import React, { type Node } from 'react';

import Jumbo from '../src/components/Jumbo';
import { timeFromStartOfYear } from '../src/timeFromStartOfYear';

export default function TimeFromStartOfYear(): Node {
  const now = new Date();

  return (
    <div>
      <div>Year {now.getFullYear()} started</div>
      <Jumbo>{timeFromStartOfYear(now)}</Jumbo>
    </div>
  );
}
