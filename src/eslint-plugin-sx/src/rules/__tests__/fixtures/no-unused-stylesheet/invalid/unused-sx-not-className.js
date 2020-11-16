/**
 * @flow
 * @eslintExpectedError SX function "styles" was not used anywhere in the "className" JSX attribute.
 * @eslintExpectedError Unused stylesheet: aaa (defined via "styles" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function Navbar(): Node {
  // "styles" is essentially unused here since it's not used in "className"
  return <div style={styles('aaa')} />;
}

const styles = sx.create({
  aaa: {
    color: 'red',
  },
});
