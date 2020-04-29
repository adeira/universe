// @flow

import * as React from 'react';
import { LocalQueryRenderer as RelayLocalQueryRenderer, ReactRelayContext } from 'react-relay';
import { invariant } from '@adeira/js';
import type { Variables } from '@adeira/relay-runtime';

import createLocalEnvironment from './createLocalEnvironment';
import type { GraphQLTaggedNode } from './types.flow';
import type { Environment } from './runtimeTypes.flow';

type RendererProps = {| +[key: string]: any |}; // it can be anything, really

type CommonProps = {|
  +query: GraphQLTaggedNode,
  +environment?: Environment,
  +variables?: Variables,
|};

type Props =
  | {|
      ...CommonProps,
      +onResponse: RendererProps => React.Node,
      +onLoading?: () => React.Node,
    |}
  | {|
      ...CommonProps,
      +render: ({| +props: ?RendererProps |}) => React.Node,
    |};

// Please note: we are currently only wrapping this component to add it correct Flow types.
// Eventually, it can be extended with other functions like original QueryRenderer.
export default function LocalQueryRenderer(props: Props) {
  function renderQueryRendererResponse({ props: rendererProps }) {
    if (!rendererProps) {
      return props.onLoading ? (
        props.onLoading()
      ) : (
        <div data-testid="loading">Loading local...</div>
      );
    }

    invariant(
      props.onResponse !== undefined,
      'LocalQueryRenderer used default render function but "onResponse" property has not been provided.',
    );

    return props.onResponse(rendererProps);
  }

  // 1) <LQR environment={Env} /> always win
  // 2) <LQR /> checks whether we provide Environment via `RelayEnvironmentProvider`
  // 3) <LQR /> defaults to the default local environment
  const context = React.useContext(ReactRelayContext);
  const environment = props.environment ?? context?.environment ?? createLocalEnvironment();

  return (
    // $FlowFixMe errors after upgrading to relay 9.1.0
    <RelayLocalQueryRenderer
      // $FlowFixMe errors after upgrading to relay 9.1.0
      environment={environment}
      render={renderQueryRendererResponse}
      {...props}
    />
  );
}
