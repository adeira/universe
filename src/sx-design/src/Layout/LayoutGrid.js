// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
  +minColumnWidth?: string,
  +spacing?: 'small' | 'none', // TODO: "medium" and "large" (after https://github.com/adeira/universe/pull/2832)
};

/**
 * Responsibility of a `LayoutGrid` component is to render given children with appropriate spacing
 * in a CSS grid.
 */
export default function LayoutGrid(props: Props): Node {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.minColumnWidth ?? '200px'}, 1fr))`,
      }}
      className={styles({
        grid: true,
        gapSmall: props.spacing == null || props.spacing === 'small', // "small" is the default
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
});
