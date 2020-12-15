// @flow

import * as React from 'react';
import { fbt } from 'fbt';

import EntrypointQueryRenderer from '../relay/EntrypointQueryRenderer';

type Props = {|
  +componentId: string,
|};

function Profile(props: Props): React.Node {
  return (
    <EntrypointQueryRenderer
      entrypointKey="com.yaComiste.Profile"
      componentId={props.componentId} // TODO: do it better
    />
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
