// @flow

import sx from '@adeira/sx';
import { Button } from '@adeira/sx-design';
import React, { type Node } from 'react';

type Props = {
  +onDecrease: () => void,
  +onIncrease: () => void,
  +billImage: Node,
};

export default function MoneyBillSelector(props: Props): Node {
  return (
    <div className={styles('wrapper')}>
      <Button onClick={props.onDecrease}>-</Button>
      <span>{props.billImage}</span>
      <Button onClick={props.onIncrease}>+</Button>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
