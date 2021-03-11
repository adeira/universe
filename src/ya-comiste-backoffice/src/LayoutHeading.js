// @flow

import React, { type ChildrenArray, type Element, type Node } from 'react';
import sx from '@adeira/sx';

import LayoutHeadingButton from './LayoutHeadingButton';
import LayoutHeadingLink from './LayoutHeadingLink';
import StatusBar from './StatusBar';

type Props = {
  +heading?: Node,
  +children?: ChildrenArray<
    RestrictedElement<typeof LayoutHeadingLink> | Element<typeof LayoutHeadingButton>,
  >,
};

export default function LayoutHeading(props: Props): Node {
  return (
    <div className={styles('heading')}>
      <StatusBar />

      {props.heading ?? null}
      {props.children ?? null}
    </div>
  );
}

const styles = sx.create({
  heading: {
    marginBottom: '1rem',
  },
});
