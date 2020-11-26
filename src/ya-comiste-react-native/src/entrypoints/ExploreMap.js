// @flow

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { fbt } from 'fbt';

function ExploreMap(): React.Node {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/mrtnzlml/ckhqtfzwd1d2319pmwi0degf3"
          pitchEnabled={false}
          rotateEnabled={false}
          logoEnabled={false}
        >
          <MapboxGL.UserLocation />
          <MapboxGL.Camera
            followUserLocation={true}
            followUserMode="course"
            animationMode="easeTo"
            animationDuration={1000}
          />
          <MapboxGL.PointAnnotation id="uniqueA" coordinate={[-99.1332, 19.4326]} />
          <MapboxGL.PointAnnotation id="uniqueB" coordinate={[-99.1337, 19.4331]} />
          <MapboxGL.PointAnnotation id="uniqueC" coordinate={[-99.1332, 19.4331]} />
          <MapboxGL.PointAnnotation id="uniqueD" coordinate={[-99.1332, 19.4336]} />
        </MapboxGL.MapView>
      </View>
    </View>
  );
}

ExploreMap.options = {
  topBar: {
    title: {
      text: (fbt('Explore map', 'Explore map screen title').toString(): string),
    },
  },
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});

export default ExploreMap;
