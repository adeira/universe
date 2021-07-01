// @flow

import React, { type ChildrenArray, type Element, type Node } from 'react';
import sx from '@adeira/sx';

import LayoutHeadingButton from './LayoutHeadingButton';
import LayoutHeadingLink from './LayoutHeadingLink';
import StatusBar from './StatusBar';

type Props = {
  +heading?: Node,
  +description?: FbtWithoutString,
  +children?: ChildrenArray<
    RestrictedElement<typeof LayoutHeadingLink> | Element<typeof LayoutHeadingButton>,
  >,
};

export default function LayoutHeading(props: Props): Node {
  return (
    <div className={styles('headingWrapper')}>
      <StatusBar />
      {props.heading ?? null}
      {props.description ? (
        <p className={styles('description')}>
          <small>{props.description}</small>
        </p>
      ) : null}
      <div className={styles('toolbar')}>{props.children ?? null}</div>
    </div>
  );
}

const styles = sx.create({
  headingWrapper: {
    marginBlockEnd: '1rem',
    borderBlockEnd: '1px solid rgba(var(--sx-accent-3))',
  },
  description: {
    margin: 0,
    fontStyle: 'italic',
  },
  toolbar: {
    marginBlock: '1rem',
  },
});
