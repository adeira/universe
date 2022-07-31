// @flow

import sx from '@adeira/sx';
import NextLink from 'next/link';
import { LinkButton } from '@adeira/sx-design';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

export default function POSCheckoutSuccessPageLayout(): Node {
  return (
    <div className={styles('root')}>
      <div className={styles('wellDone')}>
        <fbt desc="well done checkout success message">Well done! 👍</fbt>
      </div>

      <div className={styles('help')}>
        <fbt desc="success checkout help message">
          You can now go back and serve another customer!
        </fbt>
      </div>

      <LinkButton nextLinkComponent={NextLink} href="/pos/session">
        <fbt desc="start a new POS session button">Start a new POS session</fbt>
      </LinkButton>
    </div>
  );
}

const styles = sx.create({
  root: {
    color: 'white',
    backgroundColor: 'rgba(var(--sx-success-light))',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wellDone: {
    fontSize: '3rem',
  },
  help: {
    fontSize: '1rem',
    maxWidth: 750,
    marginBlockStart: '2rem',
    marginBlockEnd: '3rem',
  },
});
