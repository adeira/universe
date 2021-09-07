/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import { type Node } from 'react';

import { createPaginationContainer, graphql, type RelayPaginationContainer } from '../index';

function FunctionalFragmentExport(props: {}): Node {
  return <div {...props} />;
}

export default (createPaginationContainer(
  FunctionalFragmentExport,
  {
    functionalComponents: graphql`
      query createPaginationContainerMissingProps {
        __typename
      }
    `,
  },
  {
    getVariables: () => ({}),
    query: graphql`
      query createPaginationContainerMissingProps {
        ...createPaginationContainerMissingProps_data
      }
    `,
  },
): RelayPaginationContainer<typeof FunctionalFragmentExport>);
