// @flow

import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { graphql } from 'react-relay';

import SDUISectionRenderer from '../SDUISectionRenderer';
import QueryRenderer from '../relay/QueryRenderer';
import type { ExploreDetailQueryResponse } from './__generated__/ExploreDetailQuery.graphql';

type Props = {|
  +componentId: string,
|};

function ExploreDetail(props: Props): React.Node {
  return (
    <QueryRenderer
      query={graphql`
        query ExploreDetailQuery($entrypointID: String!) {
          mobileEntrypointSections(id: $entrypointID) {
            ...SDUISectionRendererFragment
          }
        }
      `}
      variables={{
        entrypointID: 'com.yaComiste.ExploreDetail',
      }}
      render={(relayProps: ExploreDetailQueryResponse) => {
        return (
          <SafeAreaView style={styles.safeAreaView}>
            <SDUISectionRenderer
              componentId={props.componentId} // TODO: do it better
              sections={relayProps.mobileEntrypointSections}
            />
            <View style={styles.ctaPanel}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  // TODO
                }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaButtonText}>Make a reservation (?)</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
  },
  ctaPanel: {
    height: 70,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    padding: 20,
  },
  ctaButton: {
    backgroundColor: '#6633ff',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: 'white',
  },
});

ExploreDetail.options = {
  bottomTabs: {
    visible: false, // we hide the bottom tabs to prioritize CTA button/panel
  },
};

export default ExploreDetail;
