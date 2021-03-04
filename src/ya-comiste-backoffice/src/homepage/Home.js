// @flow

import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import type { HomeQuery } from './__generated__/HomeQuery.graphql';

export default function Home(): React.Node {
  const data = useLazyLoadQuery<HomeQuery>(
    /* eslint-disable relay/unused-fields */
    graphql`
      query HomeQuery {
        whoami {
          id
          humanReadableType
        }
      }
    `,
    /* eslint-enable relay/unused-fields */
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
