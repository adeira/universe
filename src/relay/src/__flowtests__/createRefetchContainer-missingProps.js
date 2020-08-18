/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import * as React from 'react';

import { createRefetchContainer, graphql, type RefetchContainerType } from '../index';

function FunctionalFragmentExport(props) {
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
): RefetchContainerType<{||}>);
