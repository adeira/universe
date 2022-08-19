// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
};

export default function SxDesignWlcmProvider(props: Props): Node {
  return <div className={styles('base')}>{props.children}</div>;
}

const styles = sx.create({
  base: {
    '--wlcm-primary': '#3840d1',
  },
});
