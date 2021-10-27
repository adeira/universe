// @flow

import fbt from 'fbt';
import { Badge, Link, Table } from '@adeira/sx-design';
import React, { type Node } from 'react';
import { useLazyLoadQuery, graphql } from '@adeira/relay';

import type { AnalyticsRedirectsPageQuery } from './__generated__/AnalyticsRedirectsPageQuery.graphql';

export default function AnalyticsRedirectsPage(): Node {
  const { analytics } = useLazyLoadQuery<AnalyticsRedirectsPageQuery>(graphql`
    query AnalyticsRedirectsPageQuery {
      analytics {
        redirectHits {
          uuid
          redirectsTo
          description
          hits
        }
      }
    }
  `);

  return (
    <Table
      columns={[
        { Header: <fbt desc="how many hits did the link get">Hits</fbt>, accessor: 'col1' },
        { Header: <fbt desc="what is out origin redirect link">Origin</fbt>, accessor: 'col2' },
        {
          Header: <fbt desc="where does our redirect link point to">Destination</fbt>,
          accessor: 'col3',
        },
        {
          Header: <fbt desc="description or purpose of the link">Description</fbt>,
          accessor: 'col4',
        },
        { Header: () => null, accessor: 'col5' },
      ]}
      data={analytics.redirectHits.map((redirect) => {
        return {
          col1: (
            <fbt desc="number of hits">
              <fbt:plural count={redirect.hits} showCount="yes" many="hits">
                hit
              </fbt:plural>
            </fbt>
          ),
          col2: (
            <Link href={`https://abacus.kochka.com.mx/redirect/${redirect.uuid}`} target="_blank">
              https://abacus.kochka.com.mx/redirect/{redirect.uuid}
            </Link>
          ),
          col3: (
            <Link href={redirect.redirectsTo} target="_blank">
              {redirect.redirectsTo}
            </Link>
          ),
          col4: redirect.description,
          col5: (
            <Badge tint="success">
              <fbt desc="active status">active</fbt>
            </Badge>
          ),
        };
      })}
    />
  );
}
