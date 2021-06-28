// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +'data-testid'?: string,
};

// Component to be used as a placeholder when loading list of cards.
export default function Skeleton(props: Props): React.Node {
  return <div data-testid={props['data-testid']} className={styles('skeleton')} />;
}

const loading = sx.keyframes({
  from: { backgroundPosition: '200% 0' },
  to: { backgroundPosition: '-200% 0' },
});

const styles = sx.create({
  skeleton: {
    height: 250, // TODO: remove this hardcoded value
    backgroundSize: '400% 100%',
    backgroundImage: `
      linear-gradient(
        270deg,
        rgba(var(--sx-accent-1)),
        rgba(var(--sx-accent-2)),
        rgba(var(--sx-accent-2)),
        rgba(var(--sx-accent-1))
      )
    `,
    borderRadius: 'var(--sx-radius)',
    animationName: loading,
    animationDuration: '8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
});
