// @flow

import React from 'react';
import { QueryRenderer as RelayQueryRenderer } from 'react-relay';
import { invariant, sprintf } from '@kiwicom/js';
import { TimeoutError, ResponseError } from '@kiwicom/fetch';

import DefaultEnvironment from './DefaultEnvironment';
import type { GeneratedNodeMap, CacheConfig } from './types.flow';

type RendererProps = Object; // it can be anything, really

type ReadyState = {|
  +error: ?Error,
  +props: ?RendererProps,
  +retry: ?() => void,
|};

type CommonProps = {|
  +query: GeneratedNodeMap,
  +environment?: mixed,
  +cacheConfig?: CacheConfig,
  +variables?: Object,
|};

type Props =
  | {|
      ...CommonProps,
      +onSystemError?: ({ error: Error, retry: ?() => void }) => React$Node,
      +onLoading?: () => React$Node,
      +onResponse: RendererProps => React$Node,
    |}
  | {|
      ...CommonProps,
      +render: ReadyState => React$Node,
    |};

export default function QueryRenderer(props: Props) {
  function renderQueryRendererResponse({
    error,
    props: rendererProps,
    retry,
  }: ReadyState) {
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
        <div>
          {publicErrorMessage}{' '}
          <a onClick={retry} href="#">
            Retry
          </a>
          ?
        </div>
      );
    }

    if (!rendererProps) {
      return props.onLoading ? props.onLoading() : <div>Loading...</div>;
    }

    invariant(
      props.onResponse !== undefined,
      'QueryRenderer used default render function but "onResponse" property has not been provided.',
    );

    return props.onResponse(rendererProps);
  }

  return (
    <RelayQueryRenderer
      environment={DefaultEnvironment}
      render={renderQueryRendererResponse}
      {...props}
    />
  );
}
