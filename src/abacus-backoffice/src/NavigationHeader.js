// @flow

import { useLazyLoadQuery, graphql } from '@adeira/relay';
import * as sx from '@adeira/sx';
import * as React from 'react';

import type { NavigationHeaderQuery } from './__generated__/NavigationHeaderQuery.graphql';

function ProdBadge(): React.Node {
  return <span className={styles('prod')}>PROD</span>;
}

function DevBadge(): React.Node {
  return <span className={styles('dev')}>DEV</span>;
}

function NavigationHeaderDev(): React.Node {
  const data = useLazyLoadQuery<NavigationHeaderQuery>(
    graphql`
      query NavigationHeaderQuery {
        auth {
          whoami {
            isDebugAssertionsEnabled
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  );

  return data.auth.whoami.isDebugAssertionsEnabled === true ? <DevBadge /> : <ProdBadge />;
}

export default function NavigationHeader(): React.Node {
  return (
    <strong className={styles('title')}>
      🧮 Abacus
      <React.Suspense fallback={<ProdBadge />}>
        <NavigationHeaderDev />
      </React.Suspense>
    </strong>
  );
}

const styles = sx.create({
  title: {
    color: 'rgba(var(--sx-foreground))',
  },
  dev: {
    color: 'rgba(var(--sx-success))',
  },
  prod: {
    color: 'rgba(var(--sx-error))',
  },
});
