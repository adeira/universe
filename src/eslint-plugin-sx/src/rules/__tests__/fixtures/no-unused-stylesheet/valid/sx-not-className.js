// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function Navbar(): Node {
  // CallExpression "styles" is essentially unused here since it's not used
  // in "className" but we allow it (to support more complex cases).
  // TODO: improve the analysis to find such mistake
  return <div style={styles('aaa')} />;
  //          ^^^^^^^^^^^^^^^^^^^^^
}

const styles = sx.create({
  aaa: {
    color: 'red',
  },
});
