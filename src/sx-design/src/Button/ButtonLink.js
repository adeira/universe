// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import { MediaQueryMotion } from '../MediaQueries';

type Props = {
  +'onClick': (event: SyntheticEvent<HTMLButtonElement>) => void,
  +'children': FbtWithoutString,
  +'isActive'?: boolean,
  +'xstyle'?: AllCSSProperties,
  +'data-testid'?: string,
};

/**
 * Stylistically similar to <Link /> except it renders a button and expects `onClick` instead of
 * `href` property.
 *
 * ## CSS variables
 *
 * `--sx-link-text-color` (overwrites default link color)
 */
export default function ButtonLink(props: Props): React.Node {
  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      type="button"
      onClick={props.onClick}
      data-testid={props['data-testid']}
      className={sx(styles.default, props.isActive ? styles.active : styles.inactive, props.xstyle)}
    >
      {props.children}
    </button>
  );
}

const styles = sx.create({
  default: {
    'backgroundColor': 'inherit',
    'border': 'none',
    'color': 'rgba(var(--sx-link-text-color))',
    'cursor': 'pointer',
    'font': 'inherit',
    'margin': 0,
    'padding': 0,
    'textDecorationColor': 'transparent',
    'textDecorationLine': 'underline',
    'textDecorationStyle': 'solid',
    'textDecorationThickness': '.05em',
    [MediaQueryMotion.NO_PREFERENCE]: {
      transition: 'text-decoration-color 300ms',
    },
    ':hover': {
      opacity: 1,
      textDecorationColor: 'inherit',
    },
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.9,
  },
});
