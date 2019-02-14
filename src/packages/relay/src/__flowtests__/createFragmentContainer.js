// @flow

import * as React from 'react';

import { createFragmentContainer } from '../index';

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
      return <Container data={validData} fun={(_: string) => {}} />; // eslint-disable-line react/jsx-no-bind
    },
    checkInvalidFunctionProperty() {
      // $FlowExpectedError: function argument should be string, not number
      return <Container data={validData} fun={(_: number) => {}} />; // eslint-disable-line react/jsx-no-bind
    },
  };
}

type Props = {|
  +data: {|
    +required: string,
    +$refType: any,
  |},
  +fun?: string => void,
|};

const FunctionalComponent = (props: Props) => <React.Fragment />;

const ClassComponent = class extends React.Component<Props> {
  render() {
    return <React.Fragment />;
  }
};

module.exports = {
  functionalComponents: getTestCases(
    createFragmentContainer(
      FunctionalComponent,
      // $FlowExpectedError: this should be a real fragment
      'mocked',
    ),
  ),
  classComponents: getTestCases(
    createFragmentContainer(
      ClassComponent,
      // $FlowExpectedError: this should be a real fragment
      'mocked',
    ),
  ),
};
