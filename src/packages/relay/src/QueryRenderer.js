// @flow

import React from 'react';
import Relay from 'react-relay';

import DefaultEnvironment from './DefaultEnvironment';
import type { GeneratedNodeMap } from './types.flow';

type RendererProps = Object; // it can be anything, really

type Props = {|
  onSystemError?: ({ error: Error, retry: ?() => void }) => React$Node,
  onLoading?: () => React$Node,
  query: GeneratedNodeMap,
  onResponse: RendererProps => React$Node,
|};

type ReadyState = {|
  +error: ?Error,
  +props: ?RendererProps,
  +retry: ?() => void,
|};

export default function QueryRenderer(props: Props) {
  function renderQueryRendererResponse({
    error,
    props: rendererProps,
    retry,
  }: ReadyState) {
    if (error) {
      return props.onSystemError ? (
        props.onSystemError({ error, retry })
      ) : (
        <div>
          Error!{' '}
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

    return props.onResponse(rendererProps);
  }

  return (
    <Relay.QueryRenderer
      environment={DefaultEnvironment}
      render={renderQueryRendererResponse}
      {...props}
    />
  );
}
