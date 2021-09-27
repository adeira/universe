// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Fbt,
  +onClick: () => void,
  +tint?: 'default' | 'error',
};

export default function MenuItem(props: Props): Node {
  return (
    <div
      onClick={props.onClick}
      className={styles({
        menuItemWrapper: true,
        menuItemError: props.tint === 'error',
      })}
    >
      {props.children}
    </div>
  );
}

const styles = sx.create({
  menuItemWrapper: {
    'color': 'rgba(var(--sx-foreground))',
    'cursor': 'pointer',
    'paddingInline': '1rem',
    'paddingBlock': '.5rem',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-accent-1))',
    },
  },
  menuItemError: {
    color: 'rgba(var(--sx-error))',
  },
});
