// @flow

import type { Node } from 'react';

import { QueryRenderer, graphql, createEnvironment } from '../index';

function placeholder() {
  return null;
}

const environment = createEnvironment({
  fetchFn: () => {},
});

module.exports = {
  minimalUsage(): Node {
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
  minimalWithVariables(): Node {
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
  minimalUsageExtended(): Node {
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
  customEnvironment(): Node {
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
  customImplementation(): Node {
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
  validCacheConfig(): Node {
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
  withVariables(): Node {
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
  missingQuery1(): Node {
    // $FlowExpectedError[incompatible-type]: missing query property
    return <QueryRenderer onResponse={placeholder} />;
  },
  missingQuery2(): Node {
    // $FlowExpectedError[incompatible-type]: missing query property
    return <QueryRenderer render={placeholder} />;
  },
  missingOnResponseOrRender(): Node {
    return (
      // $FlowExpectedError[incompatible-type]: must use 'onResponse' or 'render' property
      <QueryRenderer
        query={graphql`
          query QueryRenderer {
            __typename
          }
        `}
      />
    );
  },
  mixedRenderAndOnResponse(): Node {
    return (
      // $FlowExpectedError[incompatible-type]: use 'onResponse' or 'render' but not both
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
  invalidCacheConfig(): Node {
    return (
      // $FlowExpectedError[incompatible-type]: this cache config is not valid
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
  invalidVariablesValue(): Node {
    return (
      // $FlowExpectedError[incompatible-type]: variables can be object or undefined but nothing else
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
