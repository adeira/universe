// @flow

import { invariant } from '@adeira/js';
import React, { useRef, useLayoutEffect, useState, type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +'children'?: Node,
  +'data-testid'?: string,
  +'show'?: boolean,
};

/**
 * Component to be used as a placeholder when loading list of cards. It matches well with
 * `ProductCard` component so it can be used as a loader for grid of products.
 *
 * Optionally, you can specify `children` property in which case the `Skeleton` component tries to
 * calculate the height and width of this children.
 */
export default function Skeleton(props: Props): Node {
  const childrenRef = useRef(null);
  const [childrenRect, setChildrenRect] = useState(null);

  if (props.show != null) {
    // Property `show` makes only sense when there is a children. It's commonly used for hiding the
    // skeleton when children loaded successfully (by setting the property to `false`).
    invariant(props.children != null, 'Property `show` can be used only with `children`.');
  }

  useLayoutEffect(() => {
    if (childrenRef.current != null) {
      const rect = childrenRef.current.getBoundingClientRect();
      setChildrenRect({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <div
      className={styles({
        skeleton: true,
        aspectRatioBox: props.children == null,
      })}
      style={
        childrenRect != null
          ? {
              width: childrenRect.width,
              height: childrenRect.height,
            }
          : undefined
      }
      data-testid={props['data-testid']}
    >
      {props.children != null ? (
        <div
          ref={childrenRef}
          style={{
            display: 'inline-block',
            visibility: props.show === true ? 'visible' : 'hidden',
          }}
        >
          {React.Children.only(props.children)}
        </div>
      ) : null}
    </div>
  );
}

const loading = sx.keyframes({
  from: { backgroundPosition: '200% 0' },
  to: { backgroundPosition: '-200% 0' },
});

const styles = sx.create({
  aspectRatioBox: {
    position: 'relative',
    width: '100%',
    paddingBlockEnd: '100%', // = width for a 1:1 aspect ratio (https://css-tricks.com/aspect-ratio-boxes/)
  },
  skeleton: {
    backgroundSize: '400% 100%',
    backgroundImage: `
      linear-gradient(
        270deg,
        rgba(var(--sx-accent-1)),
        rgba(var(--sx-accent-2)),
        rgba(var(--sx-accent-2)),
        rgba(var(--sx-accent-1))
      )
    `,
    borderRadius: 'var(--sx-radius)',
    animationName: loading,
    animationDuration: '8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
});
