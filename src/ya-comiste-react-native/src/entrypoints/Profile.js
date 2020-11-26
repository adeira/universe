// @flow

import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { fbt } from 'fbt';

function Profile(): React.Node {
  return (
    <ScrollView>
      <Text>app.Profile</Text>
    </ScrollView>
  );
}

Profile.options = {
  topBar: {
    title: {
      text: (fbt('Profile', 'Profile screen title').toString(): string),
    },
    largeTitle: {
      visible: true,
    },
  },
};

export default Profile;
