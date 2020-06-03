// @flow

import * as React from 'react';
import { QueryRenderer as RelayQueryRenderer, ReactRelayContext } from 'react-relay';
import { invariant, sprintf } from '@adeira/js';
import { TimeoutError, ResponseError } from '@adeira/fetch';
import type { Variables, CacheConfig, GraphQLTaggedNode } from '@adeira/relay-runtime';

import type { Environment } from './runtimeTypes.flow';

type ReadyState<T> = {|
  +error: ?Error,
  +props: T,
  +retry: ?() => void,
|};

type FetchPolicy = 'store-and-network' | 'network-only';

type CommonProps = {|
  +query: GraphQLTaggedNode,
  +environment?: Environment,
  +cacheConfig?: CacheConfig,
  +fetchPolicy?: FetchPolicy,
  +variables?: Variables,
|};

type Props<T> =
  | {|
      ...CommonProps,
      +onSystemError?: ({
        error: Error,
        retry: ?() => void,
        ...
      }) => React.Node,
      +onLoading?: () => React.Node,
      +onResponse: T => React.Node,
    |}
  | {|
      ...CommonProps,
      +render: (ReadyState<?T>) => React.Node,
    |};

export default function QueryRenderer<T>(props: Props<T>) {
  function renderQueryRendererResponse({ error, props: rendererProps, retry }: ReadyState<?T>) {
    if (error) {
      if (props.onSystemError) {
        return props.onSystemError({ error, retry });
      }

      let publicErrorMessage = 'Error!';
      if (error instanceof TimeoutError) {
        publicErrorMessage = 'Timeout error!';
      } else if (error instanceof ResponseError) {
        const { response } = error;
        publicErrorMessage = sprintf(
          'Unsuccessful response! (%s - %s)',
          response.status,
          response.statusText,
        );

        // You can get the actual response here:
        // error.response.json().then(data => console.warn(data));
      }

      return (
        <div data-testid="error">
          {publicErrorMessage}{' '}
          <button type="button" onClick={retry}>
            Retry
          </button>
        </div>
      );
    }

    if (rendererProps == null) {
      return props.onLoading ? props.onLoading() : <div data-testid="loading">Loading...</div>;
    }

    invariant(
      props.onResponse !== undefined,
      'QueryRenderer used default render function but "onResponse" property has not been provided.',
    );

    return props.onResponse(rendererProps);
  }

  // 1) <QR environment={Env} /> always win
  // 2) <QR /> checks whether we provide Environment via `RelayEnvironmentProvider`
  // 3) throw if no environment is set
  const context = React.useContext(ReactRelayContext);
  const environment = props.environment ?? context?.environment;

  invariant(
    environment != null,
    'QueryRenderer: Expected to have found a Relay environment provided by a `RelayEnvironmentProvider` component or by environment property.',
  );

  // Use this to disable store GC in order to reuse already existing data between screens:
  // const disposable = environment.getStore().holdGC();

  // Relay QR itself recreates the context with our environment.
  // Relay hooks are using `useRelayEnvironment` with `ReactRelayContext` inside (so we use it as well).
  return (
    <RelayQueryRenderer
      environment={environment}
      render={props.render !== undefined ? props.render : renderQueryRendererResponse}
      query={props.query}
      cacheConfig={props.cacheConfig}
      fetchPolicy={props.fetchPolicy}
      variables={props.variables ?? {}}
    />
  );
}
