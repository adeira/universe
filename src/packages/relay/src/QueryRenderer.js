// @flow

import React from 'react';
import Relay from 'react-relay';
import { invariant } from '@kiwicom/js';

import DefaultEnvironment from './DefaultEnvironment';
import type { GeneratedNodeMap } from './types.flow';

type RendererProps = Object; // it can be anything, really

type ReadyState = {|
  +error: ?Error,
  +props: ?RendererProps,
  +retry: ?() => void,
|};

type CommonProps = {|
  +query: GeneratedNodeMap,
  +environment?: mixed,
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

    invariant(
      props.onResponse !== undefined,
      'QueryRenderer used default render function but "onResponse" property has not been provided.',
    );

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
