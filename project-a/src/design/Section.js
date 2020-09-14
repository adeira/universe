// @flow strict

import * as React from 'react';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
  +className?: string,
|};

export default function Section(props: Props): React.Node {
  return (
    <HeadingLevel.Consumer>
      {(level) => (
        <HeadingLevel.Provider value={level + 1}>
          {/* eslint-disable-next-line react/forbid-elements */}
          <section {...props}>{props.children}</section>
        </HeadingLevel.Provider>
      )}
    </HeadingLevel.Consumer>
  );
}
