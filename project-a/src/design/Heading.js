// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
  +xstyle?: $FlowFixMe, // TODO: https://github.com/adeira/universe/issues/1584
|};

// https://web.dev/headings-and-landmarks/
// https://github.com/jonathantneal/h-element-spec/issues/1
export default function Heading(props: Props): React.Node {
  const removeMe = new Map(); // TODO: https://github.com/adeira/universe/pull/1583
  const className = sx(props.xstyle ?? removeMe);
  return (
    <HeadingLevel.Consumer>
      {(level) => {
        const Heading = `h${Math.min(level, 6)}`;
        return (
          <Heading className={className === '' ? undefined : className}>{props.children}</Heading>
        );
      }}
    </HeadingLevel.Consumer>
  );
}
