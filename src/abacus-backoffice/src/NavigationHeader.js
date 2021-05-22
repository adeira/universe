// @flow

import { useLazyLoadQuery, graphql } from '@adeira/relay';
import { Emoji, useSxDesignContext } from '@adeira/sx-design';
import * as sx from '@adeira/sx';
import * as React from 'react';
import fbt from 'fbt';

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
        whoami {
          isDebugAssertionsEnabled
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  );

  return data.whoami.isDebugAssertionsEnabled === true ? <DevBadge /> : <ProdBadge />;
}

export default function NavigationHeader(): React.Node {
  const { theme } = useSxDesignContext();

  return (
    <strong
      className={styles({
        title: true,
        titleDarkTheme: theme === 'dark',
      })}
    >
      <Emoji symbol={'🧮'} label={<fbt desc="abacus emoji label">abacus emoji</fbt>} /> Abacus
      <React.Suspense fallback={<ProdBadge />}>
        <NavigationHeaderDev />
      </React.Suspense>
    </strong>
  );
}

const styles = sx.create({
  title: {
    color: '#1c1e21',
  },
  titleDarkTheme: {
    color: '#fff',
  },
  dev: {
    color: 'green',
  },
  prod: {
    color: 'red',
  },
});
