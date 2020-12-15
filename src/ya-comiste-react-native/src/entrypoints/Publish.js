// @flow

import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { fbt } from 'fbt';

import EntrypointQueryRenderer from '../relay/EntrypointQueryRenderer';

type Props = {|
  +componentId: string,
|};

function Publish(props: Props): React.Node {
  return (
    <EntrypointQueryRenderer
      entrypointKey="com.yaComiste.Publish"
      componentId={props.componentId} // TODO: do it better
      render={(sduiSectionRenderer) => (
        <ScrollView>
          <Text>TODO (com.yaComiste.Publish)</Text>
          {sduiSectionRenderer}
        </ScrollView>
      )}
    />
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
