// @flow

import * as React from 'react';

import { QueryRenderer, graphql, createLocalEnvironment } from '../index';

function placeholder() {
  return null;
}

const environment = createLocalEnvironment();

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
  minimalWithVariables() {
    return (
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        variables={undefined}
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
      // $FlowExpectedError: this cache config is not valid
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        cacheConfig={{ invalid: 'ups' }}
      />
    );
  },
  invalidVariablesValue() {
    return (
      // $FlowExpectedError: variables can be object or undefined but nothing else
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
        onResponse={placeholder}
        variables={null}
      />
    );
  },
};
