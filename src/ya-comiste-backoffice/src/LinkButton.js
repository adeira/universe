// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {|
  +onClick: () => void,
  +children: React.Node,
  +xstyle?: AllCSSProperties,
|};

export default function LinkButton(props: Props): React.Node {
  return (
    <button type="button" onClick={props.onClick} className={sx(styles.default, props.xstyle)}>
      {props.children}
    </button>
  );
}

const styles = sx.create({
  default: {
    'color': '#5c6a77',
    'cursor': 'pointer',
    'fontSize': 'inherit',
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
