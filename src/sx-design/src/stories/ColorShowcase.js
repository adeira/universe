// @flow

import React, { useRef, type Node } from 'react';
import sx from '@adeira/sx';

import useAccessibleColor from './useAccessibleColor';

type Props = {
  +color: string,
};

export default function ColorShowcase(props: Props): Node {
  const backgroundRef = useRef(null);
  const accessibleColor = useAccessibleColor(backgroundRef);

  return (
    <div
      className={styles('colorSample')}
      style={{
        color: accessibleColor,
        backgroundColor: props.color,
      }}
      ref={backgroundRef}
    >
      {props.color}
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
