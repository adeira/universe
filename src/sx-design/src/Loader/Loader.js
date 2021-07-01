// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

export default function Loader(): Node {
  return (
    <div aria-label="Loading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 134"
        aria-hidden={true}
        className={styles('svg')}
      >
        <circle className={styles('svgCircle')} cy="67" cx="40" r="40" />
        <circle className={styles('svgCircle')} cy="67" cx="150" r="40" />
        <circle className={styles('svgCircle')} cy="67" cx="260" r="40" />
      </svg>
    </div>
  );
}

const bounce = sx.keyframes({
  '33%': { transform: `translateY(-1.4em)` },
  '66%': { transform: `translateY(1.4em)` },
});

const styles = sx.create({
  svg: {
    fill: 'rgba(var(--sx-accent-5))',
    height: 30,
  },
  svgCircle: {
    'animationName': bounce,
    'animationFillMode': 'both',
    'animationIterationCount': 'infinite',
    'animationTimingFunction': 'ease-in-out',
    'animationDuration': '0.6s',
    'transform': 'translateY(1.4em)',
    ':nth-child(1)': {
      animationDelay: '140ms',
    },
    ':nth-child(2)': {
      animationDelay: '70ms',
    },
  },
});
