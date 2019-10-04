// @flow

import * as React from 'react';

import { createPaginationContainer, graphql } from '../index';

// $FlowExpectedError: Missing type annotation for props.
function FunctionalFragmentExport(props) {
  return <div {...props} />;
}

export default createPaginationContainer(
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
);
