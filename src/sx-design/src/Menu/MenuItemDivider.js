// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +'data-testid'?: string,
};

export default function MenuItemDivider(props: Props): Node {
  return <div className={styles('menuItemDividerWrapper')} data-testid={props['data-testid']} />;
}

const styles = sx.create({
  menuItemDividerWrapper: {
    height: 1,
    backgroundColor: 'rgba(var(--sx-accent-1))',
  },
});
