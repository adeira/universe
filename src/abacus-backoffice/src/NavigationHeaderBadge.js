// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import type { NavigationHeaderBadgeQuery } from './__generated__/NavigationHeaderBadgeQuery.graphql';

function ProdBadge(): Node {
  return <span className={styles('prod')}>PROD</span>;
}

function DevBadge(): Node {
  return <span className={styles('dev')}>DEV</span>;
}

export default function NavigationHeaderBadge(): Node {
  const data = useLazyLoadQuery<NavigationHeaderBadgeQuery>(
    graphql`
      query NavigationHeaderBadgeQuery {
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

const styles = sx.create({
  dev: {
    color: 'rgba(var(--sx-success))',
  },
  prod: {
    color: 'rgba(var(--sx-error))',
  },
});
