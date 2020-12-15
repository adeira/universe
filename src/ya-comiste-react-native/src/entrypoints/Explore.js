// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { fbt, IntlVariations, init as fbtInit } from 'fbt';

import EntrypointQueryRenderer from '../relay/EntrypointQueryRenderer';

// TODO: use on every page (?)
// $FlowFixMe[prop-missing]
fbtInit({
  translations: require(`../../translations/out/es_MX.json`),
  fbtEnumManifest: require('../../translations/enum_manifest.json'),
  hooks: {
    getViewerContext: () => ({
      GENDER: IntlVariations.GENDER_UNKNOWN,
      locale: 'es_MX', // TODO
    }),
  },
});

type Props = {|
  +componentId: string,
|};

function Explore(props: Props): React.Node {
  React.useEffect(() => {
    const listener = {
      navigationButtonPressed: () => {
        // TODO: if `buttonId` === 'id-map'
        Navigation.push(props.componentId, {
          component: {
            name: 'com.yaComiste.ExploreMap',
          },
        });
      },
    };
    const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
    return () => unsubscribe.remove();
  }, [props.componentId]);

  return (
    <EntrypointQueryRenderer
      entrypointKey="com.yaComiste.Explore"
      componentId={props.componentId} // TODO: do it better
    />
  );
}

Explore.options = {
  topBar: {
    title: {
      text: (fbt('Explore', 'Explore screen title').toString(): string),
    },
    largeTitle: {
      // TODO: check if refetch container works OK
      visible: true,
    },
    rightButtons: [
      {
        id: 'id-map',
        text: (fbt('Map', 'Link to the map from Explore screen').toString(): string),
        color: 'white',
      },
    ],
  },
};

export default Explore;
