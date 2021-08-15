// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import { convertToRGBTriplet, isAccessible } from '@adeira/css-colors';
import { useEffect, useState } from 'react';

import { SX_DESIGN_REACT_PORTAL_ID } from '../SxDesignPortal';
import useSxDesignContext from '../useSxDesignContext';

export default function useAccessibleColor(
  // We actually do not support callback refs (https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)
  // but it's important to use the complete type because the ref might be forwarded via `forwardRef`.
  backgroundRef: ReactRefAny<HTMLElement>,
): string {
  const sxDesignContext = useSxDesignContext();
  const [accessibleColor, setAccessibleColor] = useState('rgba(var(--sx-foreground))');

  useEffect(() => {
    const root = document.querySelector(`#${SX_DESIGN_REACT_PORTAL_ID}`);
    if (root) {
      const style = window.getComputedStyle(root);
      const foregroundColor = style.getPropertyValue('--sx-foreground');

      if (backgroundRef.current != null) {
        const style = window.getComputedStyle(backgroundRef.current);
        // TODO: backgrounds without color return `rgba(0, 0, 0, 0)` (transparent) which results in
        //  incorrect decisions below because of our triplet without alpha channel
        const backgroundColor = style.getPropertyValue('background-color');

        // TODO: it would be nice to have something like "choose the best" instead of "is accessible"
        //  because this does not guarantee that the other color is more accessible
        const shouldUseForeground = isAccessible(
          foregroundColor.split(','),
          convertToRGBTriplet(backgroundColor),
          'NORMAL_TEXT',
        );

        if (sxDesignContext.theme === 'light') {
          setAccessibleColor(
            shouldUseForeground ? 'rgba(var(--sx-foreground))' : 'rgba(var(--sx-background))',
          );
        } else {
          // In dark mode the colors are flipped on purpose:
          setAccessibleColor(
            shouldUseForeground ? 'rgba(var(--sx-background))' : 'rgba(var(--sx-foreground))',
          );
        }
      }
    }
  }, [backgroundRef, sxDesignContext.theme]);

  return accessibleColor;
}
