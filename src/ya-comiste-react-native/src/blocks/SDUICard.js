// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { TouchableHighlight, View, StyleSheet, Text, ImageBackground } from 'react-native';
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
        <ImageBackground
          style={styles.cardImageWrapper}
          imageStyle={styles.cardImage}
          source={{ uri: props.data.imageBackgroundUrl }}
        >
          <View style={styles.cardTextWrapper}>
            <Text style={styles.cardText}>{props.data.title}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 10,
  },
  cardImageWrapper: {
    width: 250,
    height: 150,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 5,
  },
  cardTextWrapper: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default (createFragmentContainer(SDUICard, {
  data: graphql`
    fragment SDUICardFragment on SDUICardComponent {
      entrypointKey
      title
      imageBackgroundUrl
    }
  `,
}): FragmentContainerType<Props>);
