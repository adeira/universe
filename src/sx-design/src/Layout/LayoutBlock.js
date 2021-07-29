// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
  +spacing?: 'small' | 'none', // TODO: "medium" and "large" (after https://github.com/adeira/universe/pull/2832)
};

/**
 * Responsibility of a `LayoutBlock` component is to render given children with appropriate spacing
 * in a vertical line.
 */
export default function LayoutBlock(props: Props): Node {
  return (
    <div
      className={styles({
        block: true,
        gapSmall: props.spacing == null || props.spacing === 'small', // "small" is the default
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
});
