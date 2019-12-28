// @flow

import { useFragment, graphql } from '../../../hooks';
import type { TestFragment$key } from './__generated__/TestFragment.graphql';

const fragmentInput = graphql`
  fragment TestFragment on RootQuery {
    __typename
  }
`;

type Props = {|
  fragmentRef: TestFragment$key,
|};

// TODO: more tests from 'createFragmentContainer'

module.exports = {
  validUsage: () => {
    return function TestComponent(props: Props) {
      const data = useFragment(fragmentInput, props.fragmentRef);
      return data.__typename;
    };
  },

  // Invalid usages:
  invalidUsage: () => {
    return function TestComponent() {
      // $FlowExpectedError: number [1] is incompatible with fragment ref
      return useFragment(fragmentInput, -1); // [1]
    };
  },
};
