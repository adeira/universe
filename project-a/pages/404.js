// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Heading from '../src/design/Heading';

export default function Custom404(): React.Node {
  return (
    <div className={styles('background')}>
      <Heading>404 - Page Not Found</Heading>
    </div>
  );
}

const styles = sx.create({
  background: {
    backgroundColor: 'var(--main-bg-color)',
  },
});
