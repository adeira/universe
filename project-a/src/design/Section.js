// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import HeadingLevel from './HeadingLevel';

type Props = {|
  +children: React.Node,
  +xstyle?: $FlowFixMe, // TODO: https://github.com/adeira/universe/issues/1584
|};

export default function Section(props: Props): React.Node {
  const removeMe = new Map(); // TODO: https://github.com/adeira/universe/pull/1583
  const className = sx(props.xstyle ?? removeMe);
  return (
    <HeadingLevel.Consumer>
      {(level) => (
        <HeadingLevel.Provider value={level + 1}>
          {/* eslint-disable-next-line react/forbid-elements */}
          <section className={className === '' ? undefined : className}>{props.children}</section>
        </HeadingLevel.Provider>
      )}
    </HeadingLevel.Consumer>
  );
}
