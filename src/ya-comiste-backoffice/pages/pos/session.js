// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { graphql } from '@adeira/relay';

import QueryRenderer from '../../src/QueryRenderer';

export default function POSSessionPage(): React.Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('left')}>
        <div>TODO (selected products, +- buttons, payment)</div>
      </div>
      <main className={styles('right')}>
        <div>TODO (POS screen with all products)</div>
        <QueryRenderer
          /* eslint-disable relay/unused-fields */
          query={graphql`
            query sessionPosQuery {
              pos {
                listProducts {
                  id
                  name
                  description
                  images
                  unitLabel
                  price {
                    unitAmount
                    currency
                  }
                }
              }
            }
          `}
          /* eslint-enable relay/unused-fields */
          onResponse={(relayProps) => {
            return <pre>{JSON.stringify(relayProps, null, 2)}</pre>;
          }}
        />
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1rem',
  },
  left: {
    backgroundColor: 'white',
    height: '100vh',
    padding: 5,
  },
  right: {
    backgroundColor: '#efefef',
    padding: 5,
  },
});
