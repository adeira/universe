// @flow

import * as React from 'react';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { LocalQueryRenderer, graphql } from '../index';

function placeholder() {
  return null;
}

const environment = new Environment({
  network: Network.create(() => {}),
  store: new Store(new RecordSource()),
});

const query = graphql`
  query LocalQueryRenderer {
    __typename
  }
`;

module.exports = {
  minimalUsage() {
    return <LocalQueryRenderer environment={environment} query={query} render={placeholder} />;
  },
  withUndefinedVariables() {
    return (
      <LocalQueryRenderer
        environment={environment}
        query={query}
        render={placeholder}
        variables={undefined}
      />
    );
  },
  withEmptyVariables() {
    return (
      <LocalQueryRenderer
        environment={environment}
        query={query}
        render={placeholder}
        variables={{}}
      />
    );
  },

  // ERRORS:
  missingQuery() {
    // $FlowExpectedError: Cannot create LocalQueryRenderer element because property query is missing in props.
    return <LocalQueryRenderer environment={environment} render={placeholder} />;
  },
  missingRender() {
    return (
      // $FlowExpectedError: Cannot create LocalQueryRenderer element because property render is missing in props.
      <LocalQueryRenderer environment={environment} query={query} />
    );
  },
  invalidVariablesValue() {
    return (
      <LocalQueryRenderer
        environment={environment}
        query={query}
        render={placeholder}
        // $FlowExpectedError: Cannot create LocalQueryRenderer element because null is incompatible with Variables.
        variables={null}
      />
    );
  },
};
