// @flow

import type { Node } from 'react';

import { LocalQueryRenderer, graphql, createLocalEnvironment } from '../index';

function placeholder() {
  return null;
}

const environment = createLocalEnvironment();
const query = graphql`
  query LocalQueryRenderer {
    __typename
  }
`;

module.exports = {
  minimalUsage(): Node {
    return <LocalQueryRenderer query={query} render={placeholder} />;
  },
  withUndefinedVariables(): Node {
    return (
      <LocalQueryRenderer
        environment={environment}
        query={query}
        render={placeholder}
        variables={undefined}
      />
    );
  },
  withEmptyVariables(): Node {
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
  missingQuery(): Node {
    // $FlowExpectedError[incompatible-type]: Cannot create LocalQueryRenderer element because property query is missing in props.
    return <LocalQueryRenderer environment={environment} render={placeholder} />;
  },
  missingRender(): Node {
    return (
      // $FlowExpectedError[incompatible-type]: Cannot create LocalQueryRenderer element because property render is missing in props.
      <LocalQueryRenderer environment={environment} query={query} />
    );
  },
  invalidVariablesValue(): Node {
    return (
      // $FlowExpectedError[incompatible-type]: Cannot create LocalQueryRenderer element because null is incompatible with Variables.
      <LocalQueryRenderer
        environment={environment}
        query={query}
        render={placeholder}
        variables={null}
      />
    );
  },
};
