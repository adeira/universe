// @flow

import { graphql } from '../../index';

it('generates and flow checks the fragment as expected', () => {
  // This is technically a Flow test (we are forcing generation of Relay artifacts).
  // Relay Compiler generated invalid artifacts for eager ES modules, see:
  // https://github.com/adeira/universe/issues/1975

  graphql`
    fragment useRefetchableFragment on RootQuery
    @refetchable(queryName: "useRefetchableFragmentRefetchQuery") {
      # eslint-disable-next-line relay/unused-fields
      node(id: "my-id") {
        __typename
      }
    }
  `;
});
