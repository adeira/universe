// @flow

import { Component } from 'react';

import { createFragmentContainer, graphql, type RelayProp } from '../index';

const validData = {
  required: 'ok',
  $fragmentRefs: 'whatever', // please note: we are currently not checking the fragment type
};

function getTestCases(Container) {
  return {
    checkMissingProperty() {
      // $FlowExpectedError[prop-missing]: missing `data` property
      return <Container />;
    },
    checkInvalidProperty() {
      // $FlowExpectedError[incompatible-type]: data property value should be fragment object (not number)
      return <Container data={1} />;
    },
    checkValidProperty() {
      return <Container data={validData} />;
    },
    checkToManyProperties() {
      return (
        // $FlowExpectedError[prop-missing]: `extraProp` should not be here
        <Container data={validData} extraProp={-1} />
      );
    },
    checkValidFunctionProperty() {
      return <Container data={validData} fun={(_: string) => {}} />;
    },
    checkInvalidFunctionProperty() {
      // $FlowExpectedError[incompatible-type]: function argument should be string, not number
      return <Container data={validData} fun={(_: number) => {}} />;
    },
  };
}

type Props = {
  +relay: RelayProp,
  +data: {
    +required: string,
    +$refType: any,
  },
  +fun?: (string) => void,
};

const FunctionalComponent = (props: Props) => <div {...props} />;

const ClassComponent = class extends Component<Props> {
  render() {
    return JSON.stringify(this.props.relay.environment);
  }
};

module.exports = ({
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
      // $FlowExpectedError[incompatible-call]
      // $FlowExpectedError[incompatible-variance]
      graphql`
        query createFragmentContainer_functionalComponents {
          __typename
        }
      `,
    ),
  ),
}: $FlowFixMe);
