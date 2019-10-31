// @flow

import * as React from 'react';

import { createFragmentContainer, graphql } from '../index';

// $FlowExpectedError: Missing type annotation for props.
function FunctionalFragmentExport(props) {
  return <div {...props} />;
}

export default createFragmentContainer(FunctionalFragmentExport, {
  functionalComponents: graphql`
    query createFragmentContainerMissingProps {
      __typename
    }
  `,
});
