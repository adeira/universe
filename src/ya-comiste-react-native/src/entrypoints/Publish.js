// @flow

import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { fbt } from 'fbt';

function Publish(): React.Node {
  return (
    <ScrollView>
      <Text>app.Publish</Text>
    </ScrollView>
  );
}

Publish.options = {
  topBar: {
    title: {
      text: (fbt('Publish', 'Publish screen title').toString(): string),
    },
    largeTitle: {
      visible: true,
    },
  },
};

export default Publish;
