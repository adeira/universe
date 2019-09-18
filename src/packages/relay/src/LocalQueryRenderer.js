// @flow

import React from 'react';
import { LocalQueryRenderer as RelayLocalQueryRenderer } from 'react-relay';

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
  const environment = props.environment ?? createLocalEnvironment();
  return <RelayLocalQueryRenderer environment={environment} {...props} />;
}
