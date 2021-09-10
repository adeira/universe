// @flow

import { invariant } from '@adeira/js';
import React, { type Node, type Element } from 'react';
import sx from '@adeira/sx';

type RestrictedReactNode = number | Fbt | Element<any> | null;

// Both `title` and `description` are optional. You can choose which one (or both) you want to use
// resulting in a different style. However, you cannot avoid them both.
type Props = {
  +title?: RestrictedReactNode,
  +description?: RestrictedReactNode,
};

export default function EntityField(props: Props): Node {
  invariant(
    props.title != null || props.description != null,
    'EntityField component has to have title or description (or both).',
  );

  return (
    <div className={styles('entityField')}>
      {props.title != null ? <div className={styles('entityFieldTitle')}>{props.title}</div> : null}
      {props.description != null ? (
        <div className={styles('entityFieldDescription')}>{props.description}</div>
      ) : null}
    </div>
  );
}

const styles = sx.create({
  entityField: {
    display: 'flex',
    flexDirection: 'column',
  },
  entityFieldTitle: {
    fontWeight: 'bold',
    color: 'rgba(var(--sx-foreground))',
  },
  entityFieldDescription: {
    color: 'rgba(var(--sx-foreground))',
  },
});
