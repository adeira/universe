// @flow

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import type { FragmentContainerType } from '../relay/relayTypes';
import type { SDUIJumbotronFragment } from './__generated__/SDUIJumbotronFragment.graphql';

type Props = {|
  +data: SDUIJumbotronFragment,
|};

function SDUIJumbotron(props: Props): React.Node {
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

export default (createFragmentContainer(SDUIJumbotron, {
  data: graphql`
    fragment SDUIJumbotronFragment on SDUIJumbotronComponent {
      title
    }
  `,
}): FragmentContainerType<Props>);
