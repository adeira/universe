// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import type { FragmentContainerType } from '../relay/relayTypes';
import type { CardFragment } from './__generated__/CardFragment.graphql';

type Props = {|
  +data: CardFragment,
  +componentId: string,
|};

function Card(props: Props): React.Node {
  return (
    <View style={styles.wrapper}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: props.data.pageID, // TODO: additional props to know which detail to open (graph ID)
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
        <View style={styles.cardMock} />
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

export default (createFragmentContainer(Card, {
  data: graphql`
    fragment CardFragment on CardBlock {
      pageID
    }
  `,
}): FragmentContainerType<Props>);
