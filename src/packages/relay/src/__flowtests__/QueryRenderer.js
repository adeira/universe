// @flow

import * as React from 'react';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { QueryRenderer, graphql } from '../index';

function placeholder() {
  return null;
}

const environment = new Environment({
  network: Network.create(() => {}),
  store: new Store(new RecordSource()),
});

module.exports = {
  minimalUsage() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
      />
    );
  },
  minimalUsageExtended() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        onSystemError={placeholder}
        onLoading={placeholder}
      />
    );
  },
  customEnvironment() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        environment={environment}
      />
    );
  },
  customImplementation() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        render={placeholder}
        environment={environment}
      />
    );
  },
  validCacheConfig() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        cacheConfig={{ force: false }}
      />
    );
  },
  withVariables() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        variables={{}}
      />
    );
  },

  // ERRORS:
  missingQuery1() {
    // $FlowExpectedError: missing query property
    return <QueryRenderer onResponse={placeholder} />;
  },
  missingQuery2() {
    // $FlowExpectedError: missing query property
    return <QueryRenderer render={placeholder} />;
  },
  missingOnResponseOrRender() {
    return (
      // $FlowExpectedError: must use 'onResponse' or 'render' property
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
      />
    );
  },
  mixedRenderAndOnResponse() {
    return (
      // $FlowExpectedError: use 'onResponse' or 'render' but not both
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        render={placeholder}
      />
    );
  },
  invalidCacheConfig() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        // $FlowExpectedError: this cache config is not valid
        cacheConfig={{ invalid: 'ups' }}
      />
    );
  },
};
