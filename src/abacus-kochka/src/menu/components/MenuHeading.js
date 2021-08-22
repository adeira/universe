// @flow

import React, { type Node } from 'react';
import { Text } from '@adeira/sx-design';
import sx from '@adeira/sx';

type Props = {
  +children: FbtWithoutString,
};

export default function MenuHeading(props: Props): Node {
  return (
    <div className={styles('menuHeading')}>
      <Text as="h2" size={24} transform="uppercase">
        {props.children}
      </Text>
    </div>
  );
}

const styles = sx.create({
  menuHeading: {
    marginBlockEnd: 15,
  },
});
