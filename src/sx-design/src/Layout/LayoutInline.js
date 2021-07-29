// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
  +spacing?: 'small' | 'none', // TODO: "medium" and "large" (after https://github.com/adeira/universe/pull/2832)
};

/**
 * Responsibility of a `LayoutInline` component is to render given children with appropriate spacing
 * in horizontal line.
 */
export default function LayoutInline(props: Props): Node {
  return (
    <div
      className={styles({
        inline: true,
        gapSmall: props.spacing == null || props.spacing === 'small', // "small" is the default
        gapNone: props.spacing === 'none',
      })}
    >
      {props.children}
    </div>
  );
}

const styles = sx.create({
  inline: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gapNone: { gap: 0 },
  gapSmall: { gap: 'var(--sx-spacing-small)' },
});
