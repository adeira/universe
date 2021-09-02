/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import { type Node } from 'react';

import { createRefetchContainer, graphql, type RelayRefetchContainer } from '../index';

function FunctionalFragmentExport(props: {}): Node {
  return <div {...props} />;
}

export default (createRefetchContainer(
  FunctionalFragmentExport,
  {
    functionalComponents: graphql`
      query createRefetchContainerMissingProps {
        __typename
      }
    `,
  },
  graphql`
    query createRefetchContainerMissingProps {
      ...createRefetchContainerMissingProps_data
    }
  `,
): RelayRefetchContainer<typeof FunctionalFragmentExport>);
