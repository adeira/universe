// @flow

import * as React from 'react';
import { graphql } from '@adeira/relay';

import LayoutQueryRenderer from '../src/LayoutQueryRenderer';

export default function Home(): React.Node {
  return (
    <LayoutQueryRenderer
      variables={{}}
      /* eslint-disable relay/unused-fields */
      query={graphql`
        query pagesQuery {
          whoami {
            id
            humanReadableType
          }
        }
      `}
      /* eslint-enable relay/unused-fields */
      onResponse={(relayProps) => {
        return <pre>{JSON.stringify(relayProps, null, 2)}</pre>;
      }}
    />
  );
}
