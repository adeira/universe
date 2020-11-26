// @flow

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import type { FragmentContainerType } from '../relay/relayTypes';
import type { JumbotronFragment } from './__generated__/JumbotronFragment.graphql';

type Props = {|
  +data: JumbotronFragment,
|};

function Jumbotron(props: Props): React.Node {
  return (
    <View style={styles.jumbo}>
      <Text style={styles.title}>{props.data.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    bottom: 0,
  },
  jumbo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 250,
    backgroundColor: 'lightgrey',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
});

export default (createFragmentContainer(Jumbotron, {
  data: graphql`
    fragment JumbotronFragment on JumbotronBlock {
      title
    }
  `,
}): FragmentContainerType<Props>);
