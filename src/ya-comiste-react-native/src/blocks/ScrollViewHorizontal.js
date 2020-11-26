// @flow

import React from 'react';
import { PlatformColor, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { Navigation } from 'react-native-navigation';

import BlockRenderer from '../BlockRenderer';
import type { FragmentContainerType } from '../relay/relayTypes';
import type { ScrollViewHorizontalFragment } from './__generated__/ScrollViewHorizontalFragment.graphql';

type Props = {|
  +row: ScrollViewHorizontalFragment,
  +componentId: string,
|};

function ScrollViewHorizontal(props: Props) {
  const row = props.row;
  const numberOfBlocks = row.blocks?.length ?? 0;
  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{row.title}</Text>
        <TouchableOpacity
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: 'com.yaComiste.ExploreMore', // TODO: fetch from GraphQL (?)
              },
            });
          }}
        >
          <Text>Show more</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        disableIntervalMomentum={true}
        snapToAlignment="start"
        decelerationRate="fast"
        // https://stackoverflow.com/a/52894044/3135248
        // `style` vs. `contentContainerStyle`
        style={{
          width: '100%',
          marginVertical: 5,
        }}
        snapToInterval={260}
        contentContainerStyle={{
          width: 260 * numberOfBlocks + 20, // width of the card * number of cards + end (TODO)
          marginHorizontal: 20,
        }}
      >
        {row.blocks?.map((innerBlock) => {
          if (innerBlock == null) {
            return null; // TODO
          }
          return (
            <BlockRenderer
              componentId={props.componentId} // TODO: better
              key={innerBlock.id}
              block={innerBlock}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    color: PlatformColor('labelColor'),
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default (createFragmentContainer(ScrollViewHorizontal, {
  row: graphql`
    fragment ScrollViewHorizontalFragment on ScrollViewHorizontalBlock {
      title
      blocks {
        id
        ...BlockRendererFragment @arguments(allowRecursion: false)
      }
    }
  `,
}): FragmentContainerType<Props>);
