// @flow

import * as React from 'react';
import NextLink from 'next/link';
import sx from '@adeira/sx';
import { LocaleSwitcher } from '@adeira/sx-design';

export default function HomepageFooter(): React.Node {
  return (
    <div className={styles('wrapper')}>
      <div className={styles('languageSwitch')}>
        <LocaleSwitcher nextLinkComponent={NextLink} />
      </div>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginBlock: 10,
  },
  languageSwitch: {
    marginBlockStart: 20,
  },
});
