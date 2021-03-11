// @flow

import { createFragmentContainer, graphql, type FragmentContainerType } from '../index';

function FunctionalFragmentExport(props) {
  return <div {...props} />;
}

export default (createFragmentContainer(FunctionalFragmentExport, {
  functionalComponents: graphql`
    query createFragmentContainerMissingProps {
      __typename
    }
  `,
}): FragmentContainerType<{}>);
