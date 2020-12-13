// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, View, StyleSheet, Text } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import type { FragmentContainerType } from '../relay/relayTypes';
import type { SDUICardFragment } from './__generated__/SDUICardFragment.graphql';

type Props = {|
  +data: SDUICardFragment,
  +componentId: string,
|};

function SDUICard(props: Props): React.Node {
  return (
    <View style={styles.wrapper}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: props.data.entrypointKey, // TODO: additional props to know which detail to open (graph ID)
              // options: {
              //   topBar: {
              //     title: {
              //       text: 'XYZ', // TODO: set this per component (?)
              //     },
              //   },
              // },
            },
          });
        }}
      >
        <View style={styles.cardMock}>
          <Text>{props.data.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 10,
  },
  cardMock: {
    width: 250,
    height: 150,
    backgroundColor: 'lightgrey',
    borderRadius: 4,
  },
});

export default (createFragmentContainer(SDUICard, {
  data: graphql`
    fragment SDUICardFragment on SDUICardComponent {
      entrypointKey
      title
    }
  `,
}): FragmentContainerType<Props>);
