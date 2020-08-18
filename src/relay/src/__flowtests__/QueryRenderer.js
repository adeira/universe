// @flow

import * as React from 'react';

import { QueryRenderer, graphql, createLocalEnvironment } from '../index';

function placeholder() {
  return null;
}

const environment = createLocalEnvironment();

module.exports = {
  minimalUsage(): React.Node {
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
  minimalWithVariables(): React.Node {
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
  minimalUsageExtended(): React.Node {
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
  customEnvironment(): React.Node {
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
  customImplementation(): React.Node {
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
  validCacheConfig(): React.Node {
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
  withVariables(): React.Node {
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
  missingQuery1(): React.Node {
    // $FlowExpectedError: missing query property
    return <QueryRenderer onResponse={placeholder} />;
  },
  missingQuery2(): React.Node {
    // $FlowExpectedError: missing query property
    return <QueryRenderer render={placeholder} />;
  },
  missingOnResponseOrRender(): React.Node {
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
  mixedRenderAndOnResponse(): React.Node {
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
  invalidCacheConfig(): React.Node {
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
  invalidVariablesValue(): React.Node {
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
