// @flow

import { useContext, useCallback, type Node } from 'react';
import {
  LocalQueryRenderer as RelayLocalQueryRenderer,
  ReactRelayContext,
  type Environment,
} from 'react-relay';
import { invariant } from '@adeira/js';
import type { GraphQLTaggedNode } from 'relay-runtime';

import createLocalEnvironment from './createLocalEnvironment';
import type { Variables } from './types.flow';

type CommonProps = {
  +query: GraphQLTaggedNode,
  +environment?: Environment,
  +variables?: Variables,
};

type Props<T> =
  | $ReadOnly<{
      ...CommonProps,
      +onResponse: (T) => Node,
      +onLoading?: () => Node,
    }>
  | $ReadOnly<{
      ...CommonProps,
      +render: ({ +props: ?T, ... }) => Node,
    }>;

// Please note: we are currently only wrapping this component to add it correct Flow types.
// Eventually, it can be extended with other functions like original QueryRenderer.
export default function LocalQueryRenderer<T>(props: $ReadOnly<Props<T>>): Node {
  const onLoading = props.onLoading ? props.onLoading : undefined;
  const onResponse = props.onResponse ? props.onResponse : undefined;

  const renderQueryRendererResponse = useCallback(
    ({ props: rendererProps }) => {
      if (!rendererProps) {
        return onLoading ? onLoading() : <div data-testid="loading">Loading local…</div>;
      }

      invariant(
        onResponse !== undefined,
        'LocalQueryRenderer used default render function but "onResponse" property has not been provided.',
      );

      return onResponse(rendererProps);
    },
    [onLoading, onResponse],
  );

  // 1) <LQR environment={Env} /> always win
  // 2) <LQR /> checks whether we provide Environment via `RelayEnvironmentProvider`
  // 3) <LQR /> defaults to the default local environment
  const context = useContext(ReactRelayContext);
  const environment = props.environment ?? context?.environment ?? createLocalEnvironment();
  const { variables, ...rest } = props;
  return (
    <RelayLocalQueryRenderer
      environment={environment}
      render={renderQueryRendererResponse}
      variables={variables ?? {}}
      {...rest}
    />
  );
}
