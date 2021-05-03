// @flow

import * as React from 'react';
import { Note } from '@adeira/sx-design';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import type { IndexPageQuery } from './__generated__/IndexPageQuery.graphql';

export default function IndexPage(): React.Node {
  const data = useLazyLoadQuery<IndexPageQuery>(
    /* eslint-disable relay/unused-fields */
    graphql`
      query IndexPageQuery {
        whoami {
          id
          humanReadableType
        }
      }
    `,
    /* eslint-enable relay/unused-fields */
  );

  return (
    <>
      <Note tint="warning">work in progress</Note>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
