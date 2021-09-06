// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Tooltip from '../Tooltip/Tooltip';

/**
 * Use this component when you are rendering some data but you cannot render anything because API
 * didn't respond or there is really no data and you need to show it somehow.
 */
export default function MissingData(): Node {
  return (
    <Tooltip
      title={
        <fbt desc="explanation of a symbol for unavailable data">
          Unable to load data or missing data.
        </fbt>
      }
    >
      {/* https://en.wikipedia.org/wiki/N/A */}
      <span className={styles('symbols')}>
        <fbt desc="symbol for unavailable data">N/A</fbt>
      </span>
    </Tooltip>
  );
}

const styles = sx.create({
  symbols: {
    cursor: 'help',
    borderBlockEnd: '2px dotted',
    color: 'rgba(var(--sx-accent-5))',
    fontSize: 'smaller',
  },
});
