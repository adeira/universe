// @flow

import React, { type Node } from 'react';

import Jumbo from '../src/components/Jumbo';
import { timeUntilEndOfYear } from '../src/timeUntilEndOfYear';

export default function TimeUntilEndOfYearPage(): Node {
  const now = new Date();

  return (
    <div>
      <div>Year {now.getFullYear()} ends</div>
      <Jumbo>{timeUntilEndOfYear(now)}</Jumbo>
    </div>
  );
}
