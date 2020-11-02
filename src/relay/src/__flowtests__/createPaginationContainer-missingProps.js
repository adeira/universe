/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import { createPaginationContainer, graphql, type PaginationContainerType } from '../index';

function FunctionalFragmentExport(props) {
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
): PaginationContainerType<{||}>);
