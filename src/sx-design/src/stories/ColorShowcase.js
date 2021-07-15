// @flow

import React, { useRef, type Node } from 'react';
import sx from '@adeira/sx';

import Text from '../Text/Text';

type Props = {
  +color: string,
};

export default function ColorShowcase(props: Props): Node {
  const backgroundRef = useRef(null);

  return (
    <div
      className={styles('colorSample')}
      style={{ backgroundColor: props.color }}
      ref={backgroundRef}
    >
      <Text backgroundRef={backgroundRef}>{props.color}</Text>
    </div>
  );
}

const styles = sx.create({
  colorSample: {
    paddingBlock: 5,
    paddingInline: 10,
    borderInline: '1px solid grey',
  },
});
