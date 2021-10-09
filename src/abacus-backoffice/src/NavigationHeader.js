// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';

import ErrorBoundaryEmpty from './ErrorBoundaryEmpty';
import NavigationHeaderBadge from './NavigationHeaderBadge';

export default function NavigationHeader(): Node {
  return (
    <strong className={styles('title')}>
      🧮 Abacus
      <React.Suspense fallback={null}>
        <ErrorBoundaryEmpty>
          <NavigationHeaderBadge />
        </ErrorBoundaryEmpty>
      </React.Suspense>
    </strong>
  );
}

const styles = sx.create({
  title: {
    color: 'rgba(var(--sx-foreground))',
  },
});
