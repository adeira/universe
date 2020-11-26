// @flow

import * as React from 'react';
import { Text } from 'react-native';
import { fbt } from 'fbt';

function ExploreMore(): React.Node {
  return <Text>app.ExploreMore</Text>;
}

ExploreMore.options = {
  topBar: {
    title: {
      text: (fbt('Explore more', 'Explore more screen title').toString(): string),
    },
  },
};

export default ExploreMore;
