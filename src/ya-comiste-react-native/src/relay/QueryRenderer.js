// @flow

import * as React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import {
  QueryRenderer as RelayQueryRenderer,
  type Variables,
  type GraphQLTaggedNode,
} from 'react-relay';

import relayEnvironment from './relayEnvironment';

type Props = {|
  +query: GraphQLTaggedNode,
  +variables: Variables,
  +render: (any) => React.Node, // TODO
|};

export default function QueryRenderer(props: Props): React.Node {
  return (
    <RelayQueryRenderer
      environment={relayEnvironment}
      query={props.query}
      variables={props.variables ?? {}}
      render={({ error, props: relayProps }) => {
        if (error) {
          // TODO: do not throw but log and render instead
          throw new Error(error);
        }

        if (!relayProps) {
          return (
            <SafeAreaView style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#6633ff" />
            </SafeAreaView>
          );
        }

        return props.render(relayProps);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
