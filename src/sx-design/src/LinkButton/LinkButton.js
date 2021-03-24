// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {|
  +onClick: () => void,
  +children: React.Node,
  +isActive?: boolean,
  +xstyle?: AllCSSProperties,
|};

/**
 * Stylistically similar to <Link /> except it renders a button and expects `onClick` instead of
 * `href` property.
 */
export default function LinkButton(props: Props): React.Node {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={sx(styles.default, props.isActive ? null : styles.inactive, props.xstyle)}
    >
      {props.children}
    </button>
  );
}

const styles = sx.create({
  default: {
    'backgroundColor': 'inherit',
    'border': 'none',
    'color': 'rgba(var(--sx-text-link-color))',
    'cursor': 'pointer',
    'font': 'inherit',
    'margin': 0,
    'padding': 0,
    ':hover': {
      textDecoration: 'underline',
    },
  },
  inactive: {
    opacity: 0.85,
  },
});
