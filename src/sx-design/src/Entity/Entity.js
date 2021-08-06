// @flow

import { invariant } from '@adeira/js';
import React, { type ChildrenArray, type Node } from 'react';
import sx from '@adeira/sx';

import EntityField from './EntityField';

type Props = {
  +children: ChildrenArray<RestrictedElement<typeof EntityField>>,
};

export default function Entity(props: Props): Node {
  invariant(props.children != null, 'Component Entity has to be called with some children.');

  return <div className={styles('entity')}>{props.children}</div>;
}

const styles = sx.create({
  entity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(var(--sx-accent-1))',
    borderRadius: 'var(--sx-radius)',
    padding: '1rem',
  },
});
