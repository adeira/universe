// @flow

import React, { type Node } from 'react';
import { Heading } from '@adeira/sx-design';
import sx from '@adeira/sx';

type Props = {
  +children: FbtWithoutString,
};

export default function MenuHeading(props: Props): Node {
  return (
    <Heading>
      <div className={styles('menuHeading')}>{props.children}</div>
    </Heading>
  );
}

const styles = sx.create({
  menuHeading: {
    textTransform: 'uppercase',
    marginBottom: 15,
  },
});
