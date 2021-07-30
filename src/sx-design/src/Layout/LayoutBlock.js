// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +'children': Node,
  +'spacing'?: 'small' | 'medium' | 'large' | 'none',
  +'data-testid'?: string,
};

/**
 * Responsibility of a `LayoutBlock` component is to render given children with appropriate spacing
 * in a vertical line.
 */
export default function LayoutBlock(props: Props): Node {
  return (
    <div
      data-testid={props['data-testid']}
      className={styles({
        block: true,
        gapSmall: props.spacing == null || props.spacing === 'small', // "small" is the default
        gapMedium: props.spacing === 'medium',
        gapLarge: props.spacing === 'large',
        gapNone: props.spacing === 'none',
      })}
    >
      {props.children}
    </div>
  );
}

const styles = sx.create({
  block: {
    display: 'flex',
    flexDirection: 'column',
  },
  gapNone: { gap: 0 },
  gapSmall: { gap: 'var(--sx-spacing-small)' },
  gapMedium: { gap: 'var(--sx-spacing-medium)' },
  gapLarge: { gap: 'var(--sx-spacing-large)' },
});
