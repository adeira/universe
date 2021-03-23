// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {|
  +onClick: () => void,
  +children: React.Node,
  +xstyle?: AllCSSProperties,
|};

/**
 * Similar to <Link /> except it renders a button and expects `onClick` instead of `href` property.
 */
export default function LinkButton(props: Props): React.Node {
  return (
    <button type="button" onClick={props.onClick} className={sx(styles.default, props.xstyle)}>
      {props.children}
    </button>
  );
}

const styles = sx.create({
  default: {
    'border': 'none',
    'backgroundColor': 'inherit',
    'cursor': 'pointer',
    'fontSize': 'inherit',
    'padding': 0,
    'margin': 0,
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
