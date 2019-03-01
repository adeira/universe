// @flow

import * as React from 'react';

import { createFragmentContainer, graphql, type RelayProp } from '../index';

const validData = {
  required: 'ok',
  $fragmentRefs: 'whatever', // please note: we are currently not checking the fragment type
};

function getTestCases(Container) {
  return {
    checkMissingProperty() {
      // $FlowExpectedError: missing `data` property
      return <Container />;
    },
    checkInvalidProperty() {
      // $FlowExpectedError: data property value should be fragment object (not number)
      return <Container data={1} />;
    },
    checkValidProperty() {
      return <Container data={validData} />;
    },
    checkToManyProperties() {
      return (
        // $FlowExpectedError: `extraProp` should not be here
        <Container data={validData} extraProp={-1} />
      );
    },
    checkValidFunctionProperty() {
      return <Container data={validData} fun={(_: string) => {}} />; // eslint-disable-line react/jsx-no-bind, no-unused-vars
    },
    checkInvalidFunctionProperty() {
      // $FlowExpectedError: function argument should be string, not number
      return <Container data={validData} fun={(_: number) => {}} />; // eslint-disable-line react/jsx-no-bind, no-unused-vars
    },
  };
}

type Props = {|
  +relay: RelayProp,
  +data: {|
    +required: string,
    +$refType: any,
  |},
  +fun?: string => void,
|};

const FunctionalComponent = (props: Props) => <React.Fragment />; // eslint-disable-line no-unused-vars

const ClassComponent = class extends React.Component<Props> {
  render() {
    return JSON.stringify(this.props.relay.environment);
  }
};

module.exports = {
  functionalComponents: getTestCases(
    createFragmentContainer(FunctionalComponent, {
      functionalComponents: graphql`
        query createFragmentContainer_functionalComponents {
          __typename
        }
      `,
    }),
  ),
  classComponents: getTestCases(
    createFragmentContainer(ClassComponent, {
      classComponents: graphql`
        query createFragmentContainer_classComponents {
          __typename
        }
      `,
    }),
  ),

  // Legacy graphql usage:
  legacyFunctionalComponents: getTestCases(
    createFragmentContainer(
      FunctionalComponent,
      // $FlowExpectedError: cannot call createFragmentContainer with template string bound to fragmentSpec because GraphQLTaggedNode is incompatible with FragmentSpec
      graphql`
        query createFragmentContainer_functionalComponents {
          __typename
        }
      `,
    ),
  ),
};
