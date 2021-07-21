// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import useAccessibleColors from './useAccessibleColors';

type Props = {
  +children: Fbt,
  +backgroundRef?: { current: null | HTMLElement },
  +truncate?: boolean,
  +transform?: 'capitalize' | 'lowercase' | 'uppercase',
};

/**
 * Purpose of this component is to render accessible text in a given context. Specifically, it takes
 * into account background color of the parent component and renders the text with a proper color
 * contrast. To specify the background color, you have to specify `backgroundRef` which is a reference
 * to the parent element.
 *
 * Additionally, you can specify these properties to modify the text appearance and behavior:
 *
 *  - `truncate` to truncate the text into a single line (TODO: multiline clamp with lineClamp)
 *  - `transform` to modify text-transform property
 */
export default function Text(props: Props): Node {
  const accessibleTextColor = useAccessibleColors(props.backgroundRef ?? { current: null });

  return (
    <p
      style={{
        color: props.backgroundRef != null ? accessibleTextColor : 'rgba(var(--sx-foreground))',
        textTransform: props.transform ?? 'inherit',
      }}
      className={styles({
        base: true,
        truncate: props.truncate === true,
      })}
    >
      {props.children}
    </p>
  );
}

const styles = sx.create({
  base: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
    margin: 0,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
