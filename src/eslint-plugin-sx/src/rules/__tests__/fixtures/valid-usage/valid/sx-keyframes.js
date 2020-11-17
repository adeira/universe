// @flow

import type { Node } from 'react';
import * as sx from '@adeira/sx';

export function AnimatedComponent(): Node {
  return (
    <>
      <div className={styles('fadeIn')}>fade-in text</div>
      <div className={styles('simple')}>simple text</div>
    </>
  );
}

const fadeIn = sx.keyframes({
  '0%': { opacity: 0 },
  '50%, 55%': { opacity: 0.3 },
  '100%': { opacity: 1 },
});

const simple = sx.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = sx.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '2s',
  },
  simple: {
    animationName: simple,
    animationDuration: '1s',
  },
});
