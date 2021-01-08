// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyCustomComponent(): Node {
  return <div xstyle={styles.spacing} />;
}

const styles = sx.create({
  spacing: {
    marginTop: 4,
  },
});
