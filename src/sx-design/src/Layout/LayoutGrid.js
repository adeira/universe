// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +'children': Node,
  +'minColumnWidth'?: string,
  +'spacing'?: 'small' | 'medium' | 'large' | 'none',
  +'data-testid'?: string,
};

/**
 * Responsibility of a `LayoutGrid` component is to render given children with appropriate spacing
 * in a CSS grid.
 */
export default function LayoutGrid(props: Props): Node {
  return (
    <div
      data-testid={props['data-testid']}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.minColumnWidth ?? '200px'}, 1fr))`,
      }}
      className={styles({
        grid: true,
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
  grid: {
    display: 'grid',
  },
  gapNone: { gap: 0 },
  gapSmall: { gap: 'var(--sx-spacing-small)' },
  gapMedium: { gap: 'var(--sx-spacing-medium)' },
  gapLarge: { gap: 'var(--sx-spacing-large)' },
});
