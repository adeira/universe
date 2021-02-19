// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
  +xstyle?: AllCSSProperties,
|};

// https://web.dev/headings-and-landmarks/
// https://github.com/jonathantneal/h-element-spec/issues/1
export default function Heading(props: Props): React.Node {
  return (
    <HeadingLevel.Consumer>
      {(level) => {
        const Heading = `h${Math.min(level, 6)}`;
        return <Heading className={sx(props.xstyle)}>{props.children}</Heading>;
      }}
    </HeadingLevel.Consumer>
  );
}
