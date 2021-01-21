// @flow

import * as React from 'react';
import sx from '@adeira/sx';

// Component to be used as a placeholder when loading list of cards.
export default function Skeleton(): React.Node {
  return <div className={styles('skeleton')} />;
}

const loading = sx.keyframes({
  from: { backgroundPosition: '200% 0' },
  to: { backgroundPosition: '-200% 0' },
});

const styles = sx.create({
  skeleton: {
    height: 250,
    backgroundImage: 'linear-gradient(270deg, #f8f9fa, #e9ecef, #e9ecef, #f8f9fa)',
    backgroundSize: '400% 100%',
    animationName: loading,
    animationDuration: '4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
});
