// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import useSxDesignContext from '../useSxDesignContext';

// Component to be used as a placeholder when loading list of cards.
export default function Skeleton(): React.Node {
  const { darkMode } = useSxDesignContext();

  return (
    <div
      className={styles({
        skeleton: true,
        backgroundDark: darkMode === true,
        backgroundLight: darkMode === false,
      })}
    />
  );
}

const loading = sx.keyframes({
  from: { backgroundPosition: '200% 0' },
  to: { backgroundPosition: '-200% 0' },
});

// FIXME:
// eslint-disable-next-line sx/no-unused-stylesheet
const styles = sx.create({
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
  skeleton: {
    height: 250,
    backgroundSize: '400% 100%',
    animationName: loading,
    animationDuration: '4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
  backgroundDark: {
    backgroundImage: 'linear-gradient(to left, #888, #555, #888)',
  },
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
  backgroundLight: {
    backgroundImage: 'linear-gradient(to left, #f8f8f8, #e2e2e2, #f8f8f8)',
  },
});
