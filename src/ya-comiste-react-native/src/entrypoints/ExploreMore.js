// @flow

import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { fbt } from 'fbt';

import EntrypointQueryRenderer from '../relay/EntrypointQueryRenderer';

type Props = {|
  +componentId: string,
|};

function ExploreMore(props: Props): React.Node {
  return (
    <EntrypointQueryRenderer
      entrypointKey="com.yaComiste.ExploreMore"
      componentId={props.componentId} // TODO: do it better
      render={(sduiSectionRenderer) => (
        <ScrollView>
          <Text>TODO (com.yaComiste.ExploreMore)</Text>
          {sduiSectionRenderer}
        </ScrollView>
      )}
    />
  );
}

ExploreMore.options = {
  topBar: {
    title: {
      text: (fbt('Explore more', 'Explore more screen title').toString(): string),
    },
  },
};

export default ExploreMore;
