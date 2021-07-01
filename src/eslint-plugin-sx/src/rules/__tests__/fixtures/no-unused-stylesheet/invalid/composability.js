/**
 * @flow
 * @eslintExpectedError Unknown stylesheet used: yadada (not defined anywhere)
 * @eslintExpectedError Unused stylesheet: spacing (defined via "styles" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyCustomComponent(): Node {
  // $FlowExpectedError[incompatible-use] yadada
  return <div xstyle={styles.yadada} />;
}

const styles = sx.create({
  spacing: {
    marginBlockStart: 4,
  },
});
