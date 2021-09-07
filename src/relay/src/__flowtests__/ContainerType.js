// @flow

import {
  graphql,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  type RelayFragmentContainer,
  type RelayPaginationContainer,
  type RelayRefetchContainer,
} from '../index';

type Props = {
  +aaa: string,
  +bbb: number,
};

function DefaultComponent(props: Props) {
  return <div {...props} />;
}

const TestFragmentComponent = (createFragmentContainer(DefaultComponent, {
  data: graphql`
    query ContainerTypeFlowtestQuery {
      __typename
    }
  `,
}): RelayFragmentContainer<typeof DefaultComponent>);

const TestPaginationComponent = (createPaginationContainer(
  DefaultComponent,
  {
    data: graphql`
      query ContainerTypeFlowtestQuery {
        __typename
      }
    `,
  },
  {
    getVariables: () => ({}),
    query: graphql`
      query ContainerTypeFlowtestPaginationQuery {
        __typename
      }
    `,
  },
): RelayPaginationContainer<typeof DefaultComponent>);

const TestRefetchComponent = (createRefetchContainer(
  DefaultComponent,
  {
    data: graphql`
      query ContainerTypeFlowtestQuery {
        __typename
      }
    `,
  },
  graphql`
    query ContainerTypeFlowtestRefetchQuery {
      __typename
    }
  `,
): RelayRefetchContainer<typeof DefaultComponent>);

module.exports = ({
  correctProps1: <TestFragmentComponent aaa="OK" bbb={1} />,
  correctProps2: <TestPaginationComponent aaa="OK" bbb={1} />,
  correctProps3: <TestRefetchComponent aaa="OK" bbb={1} />,

  // $FlowExpectedError[incompatible-type]
  invalidProps1: <TestFragmentComponent aaa={-1} bbb="wtf" />,
  // $FlowExpectedError[incompatible-type]
  invalidProps2: <TestPaginationComponent aaa={-1} bbb="wtf" />,
  // $FlowExpectedError[incompatible-type]
  invalidProps3: <TestRefetchComponent aaa={-1} bbb="wtf" />,

  // $FlowExpectedError[prop-missing]
  missingProps1: <TestFragmentComponent aaa="OK" />,
  // $FlowExpectedError[prop-missing]
  missingProps2: <TestFragmentComponent bbb={1} />,
  // $FlowExpectedError[prop-missing]
  missingProps3: <TestPaginationComponent aaa="OK" />,
  // $FlowExpectedError[prop-missing]
  missingProps4: <TestPaginationComponent bbb={1} />,
  // $FlowExpectedError[prop-missing]
  missingProps5: <TestRefetchComponent aaa="OK" />,
  // $FlowExpectedError[prop-missing]
  missingProps6: <TestRefetchComponent bbb={1} />,

  // $FlowExpectedError[prop-missing]
  extraProps1: <TestFragmentComponent aaa="OK" bbb={1} ccc={'!'} />,
  // $FlowExpectedError[prop-missing]
  extraProps2: <TestPaginationComponent aaa="OK" bbb={1} ccc={'!'} />,
  // $FlowExpectedError[prop-missing]
  extraProps3: <TestRefetchComponent aaa="OK" bbb={1} ccc={'!'} />,
}: $FlowFixMe);
