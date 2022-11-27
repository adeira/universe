// @flow

import * as Sentry from '@sentry/nextjs';
import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { ErrorBoundary, Loader } from '@adeira/sx-design';

import Navigation from './Navigation';

type Props = {
  +children: Node,
  +navigationLinks?: $ReadOnlyArray<Node>,
};

export default function LayoutApp(props: Props): Node {
  return (
    <div>
      <div className={styles('navigation')}>
        <Navigation />
      </div>

      <div className={styles('contentRoot')}>
        <div>
          {props.navigationLinks != null ? (
            <div className={styles('navigationLinksWrapper')}>
              {props.navigationLinks?.map((navigationLink, index) => (
                <div key={index} className={styles('navigationLink')}>
                  {navigationLink}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <main className={styles('main')}>
          <ErrorBoundary
            onComponentDidCatch={(error, errorInfo) => {
              Sentry.captureException(error, { extra: { errorInfo } });
            }}
          >
            <React.Suspense fallback={<Loader />}>{props.children}</React.Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

const styles = sx.create({
  navigation: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(var(--sx-background))',
  },
  contentRoot: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    backgroundColor: 'rgba(var(--sx-background))',
    paddingBlock: 'var(--sx-spacing-medium)',
    paddingInline: 'var(--sx-spacing-large)',
    minHeight: '100vh',
  },
  main: {
    width: '100%',
  },
  navigationLinksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
  },
  navigationLink: {
    paddingBlock: 3,
  },
});
