// @flow

import React, { useContext } from 'react';
import { LocalQueryRenderer as RelayLocalQueryRenderer, ReactRelayContext } from 'react-relay';

import createLocalEnvironment from './createLocalEnvironment';
import type { GraphQLTaggedNode, Variables, Environment } from './types.flow';

type RendererProps = {| +[key: string]: any |}; // it can be anything, really

type Props = {|
  +query: GraphQLTaggedNode,
  +render: ({| +props: ?RendererProps |}) => React$Node,
  +environment?: Environment,
  +variables?: Variables,
|};

export default function LocalQueryRenderer(props: Props) {
  // Please note: we are currently only wrapping this component to add it correct Flow types.
  // Eventually, it can be extended with other functions like original QueryRenderer.

  // 1) <LQR environment={Env} /> always win
  // 2) <LQR /> checks whether we provide Environment via `RelayEnvironmentProvider`
  // 3) <LQR /> defaults to the default local environment
  const context = useContext(ReactRelayContext);
  // TODO: does it make sense to add support for separate local env context?
  const environment = props.environment ?? context?.environment ?? createLocalEnvironment();
  return <RelayLocalQueryRenderer environment={environment} {...props} />;
}
