// @flow

import { isAccessible } from '@adeira/css-colors';
import { useEffect, useState } from 'react';
import * as React from 'react';

import { SX_DESIGN_REACT_PORTAL_ID } from '../SxDesignPortal';

type Props = {
  +colorVar: string,
};

export default function ColorShowcase(props: Props): React.Node {
  const [shouldUseForeground, setShouldUseForeground] = useState(true);

  useEffect(() => {
    const root = document.querySelector(`#${SX_DESIGN_REACT_PORTAL_ID}`);
    if (root) {
      const style = window.getComputedStyle(root);
      const foregroundColor = style.getPropertyValue('--sx-foreground');
      const backgroundColor = style.getPropertyValue(props.colorVar);
      setShouldUseForeground(
        isAccessible(foregroundColor.split(','), backgroundColor.split(','), 'NORMAL_TEXT'),
      );
    }
  }, [props.colorVar]);

  return (
    <div
      style={{
        color: shouldUseForeground ? 'rgba(var(--sx-foreground))' : 'rgba(var(--sx-background))',
        backgroundColor: `rgba(var(${props.colorVar}))`,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      rgba(var({props.colorVar}))
    </div>
  );
}
