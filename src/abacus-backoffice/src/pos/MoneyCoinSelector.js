// @flow

import sx from '@adeira/sx';
import { Button } from '@adeira/sx-design';
import React, { type Node } from 'react';

type Props = {
  +onDecrease: () => void,
  +onIncrease: () => void,
  +value: Node,
};

export default function MoneyCoinSelector(props: Props): Node {
  return (
    <div className={styles('wrapper')}>
      <Button onClick={props.onDecrease}>-</Button>
      <div className={styles('coin')}>{props.value}</div>
      <Button onClick={props.onIncrease}>+</Button>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  coin: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(var(--sx-accent-4))',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(var(--sx-accent-6))',
  },
});
