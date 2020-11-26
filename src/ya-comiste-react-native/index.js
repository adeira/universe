// @flow

import { Navigation } from 'react-native-navigation';
import MapboxGL from '@react-native-mapbox-gl/maps';

import Explore from './src/entrypoints/Explore';
import ExploreDetail from './src/entrypoints/ExploreDetail';
import ExploreMap from './src/entrypoints/ExploreMap';
import ExploreMore from './src/entrypoints/ExploreMore';
import Profile from './src/entrypoints/Profile';
import Publish from './src/entrypoints/Publish';

// https://account.mapbox.com/
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibXJ0bnpsbWwiLCJhIjoiY2tocXRjODYxMGJlZTJ4bWoyeGZuanZmZiJ9.wX9dThRRU1-80f0UbYbF3w',
);

// TODO: this can be done automatically (see src/entrypoints)
Navigation.registerComponent('com.yaComiste.Explore', () => Explore);
Navigation.registerComponent('com.yaComiste.ExploreDetail', () => ExploreDetail);
Navigation.registerComponent('com.yaComiste.ExploreMap', () => ExploreMap);
Navigation.registerComponent('com.yaComiste.ExploreMore', () => ExploreMore);
Navigation.registerComponent('com.yaComiste.Profile', () => Profile);
Navigation.registerComponent('com.yaComiste.Publish', () => Publish);

Navigation.setDefaultOptions({
  layout: {
    orientation: ['portrait'],
  },
  topBar: {
    visible: true,
    noBorder: true,
    background: { color: '#6633ff' },
    title: { color: 'white' },
    subtitle: { color: 'white' },
    largeTitle: { color: 'white' },
    backButton: { color: 'white' },
  },
  bottomTab: { selectedIconColor: '#6633ff' },
  statusBar: {
    style: 'light', // TODO: doesn't work (?)
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'EXPLORE_TAB',
              children: [
                {
                  component: {
                    name: 'com.yaComiste.Explore',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Explore',
                  icon: {
                    // https://github.com/facebook/react-native/blob/0675beee11a51a346281f92cee56dbe2320c084f/Libraries/Image/ImageSource.js
                    // TODO: the icon sizes seem to be broken in different devices
                    scale: 3,
                    uri: 'icon-explore',
                  },
                },
              },
            },
          },
          // TODO: "Saved"
          {
            stack: {
              id: 'PUBLISH_TAB',
              children: [
                {
                  component: {
                    id: 'PUBLISH_SCREEN', // TODO: wha is this ID for (?)
                    name: 'com.yaComiste.Publish',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Publish',
                  icon: {
                    scale: 3,
                    uri: 'icon-publish',
                  },
                },
              },
            },
          },
          // TODO: space for something else to balance "Saved"
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'PROFILE_SCREEN',
                    name: 'com.yaComiste.Profile',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: {
                    scale: 3,
                    uri: 'icon-profile',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
