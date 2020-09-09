// @flow strict

import * as React from 'react';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
|};

export default function Section(props: Props): React.Node {
  return (
    <HeadingLevel.Consumer>
      {(level) => <HeadingLevel.Provider value={level + 1}>{props.children}</HeadingLevel.Provider>}
    </HeadingLevel.Consumer>
  );
}
