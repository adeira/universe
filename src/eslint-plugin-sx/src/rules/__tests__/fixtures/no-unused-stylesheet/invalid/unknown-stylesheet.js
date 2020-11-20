/**
 * @flow
 * @eslintExpectedError (12:33;12:41) Unknown stylesheet used: yadada (not defined anywhere)
 * @eslintExpectedError (16:3;18:4) Unused stylesheet: aaa (defined via "styles" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  // $FlowExpectedError[incompatible-call] - yadada is not defined in the stylesheet below
  return <div className={styles('yadada')} />;
}

const styles = sx.create({
  aaa: {
    color: 'red',
  },
});
