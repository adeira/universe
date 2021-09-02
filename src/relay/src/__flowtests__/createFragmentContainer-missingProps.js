// @flow

import { type Node } from 'react';

import { createFragmentContainer, graphql, type RelayFragmentContainer } from '../index';

function FunctionalFragmentExport(props: {}): Node {
  return <div {...props} />;
}

export default (createFragmentContainer(FunctionalFragmentExport, {
  functionalComponents: graphql`
    query createFragmentContainerMissingProps {
      __typename
    }
  `,
}): RelayFragmentContainer<typeof FunctionalFragmentExport>);
