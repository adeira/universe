// @flow strict

import * as React from 'react';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
  +className?: string,
|};

// https://web.dev/headings-and-landmarks/
export default function Heading(props: Props): React.Node {
  // TODO: make sure H1 is used only once
  return (
    <HeadingLevel.Consumer>
      {(level) => {
        const Heading = `h${Math.min(level, 6)}`;
        return <Heading {...props} />;
      }}
    </HeadingLevel.Consumer>
  );
}
