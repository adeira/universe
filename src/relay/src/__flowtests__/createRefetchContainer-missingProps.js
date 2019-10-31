// @flow

import * as React from 'react';

import { createRefetchContainer, graphql } from '../index';

// $FlowExpectedError: Missing type annotation for props.
function FunctionalFragmentExport(props) {
  return <div {...props} />;
}

export default createRefetchContainer(
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
);
