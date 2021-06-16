// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

export default function MissingData(): Node {
  return (
    <abbr
      title={
        <fbt desc="explanation of a symbol for unavailable data">
          Unable to load data or missing data.
        </fbt>
      }
      className={styles('abbr')}
    >
      ∞
    </abbr>
  );
}

const styles = sx.create({
  abbr: {
    cursor: 'help',
  },
});
