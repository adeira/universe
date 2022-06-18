// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +'children': Node,
  +'spacing'?: 'small' | 'medium' | 'large' | 'none',
  +'data-testid'?: string,
  +'justifyContent'?: 'space-between' | 'space-evenly',
  +'alignItems'?: 'start' | 'center' | 'end' | 'baseline',
  +'as'?: 'div' | 'nav',
  +'aria-label'?: Fbt,
};

/**
 * Responsibility of a `LayoutInline` component is to render given children with appropriate spacing
 * in horizontal line.
 */
export default function LayoutInline(props: Props): Node {
  const AsComponent = props.as ?? 'div';
  return (
    <AsComponent
      aria-label={props['aria-label']}
      data-testid={props['data-testid']}
      className={styles({
        inline: true,
        gapSmall: props.spacing == null || props.spacing === 'small', // "small" is the default
        gapMedium: props.spacing === 'medium',
        gapLarge: props.spacing === 'large',
        gapNone: props.spacing === 'none',
        justifyContentSpaceBetween: props.justifyContent === 'space-between',
        justifyContentSpaceEvenly: props.justifyContent === 'space-evenly',
        alignItemsStart: props.alignItems === 'start',
        alignItemsCenter: props.alignItems === 'center',
        alignItemsEnd: props.alignItems === 'end',
        alignItemsBaseline: props.alignItems === 'baseline',
      })}
    >
      {props.children}
    </AsComponent>
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
  gapMedium: { gap: 'var(--sx-spacing-medium)' },
  gapLarge: { gap: 'var(--sx-spacing-large)' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  justifyContentSpaceEvenly: { justifyContent: 'space-evenly' },
  alignItemsStart: { alignItems: 'start' },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsEnd: { alignItems: 'end' },
  alignItemsBaseline: { alignItems: 'baseline' },
});
