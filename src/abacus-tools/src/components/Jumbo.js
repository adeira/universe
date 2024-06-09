// @flow strict

import * as sx from '@stylexjs/stylex';
import { type Node } from 'react';

export default function Jumbo(props: { +children: string }): Node {
  return (
    <div>
      <div {...sx.props(styles.jumbo)}>{props.children}</div>
    </div>
  );
}

const styles = sx.create({
  jumbo: {
    fontSize: '8em',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 'bold',
    transition: 'all 0.5s ease-in-out',
  },
});
