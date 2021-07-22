// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +width: number | string,
  +height: number | string,
  +label?: FbtWithoutString,
};

export default function Placeholder(props: Props): Node {
  return (
    <div className={styles('placeholder')} style={{ width: props.width, height: props.height }}>
      {props.label != null ? (
        <div className={styles('label')}>{props.label}</div>
      ) : (
        <svg
          className={styles('svg')}
          xmlns="http://www.w3.org/2000/svg"
          data-testid="placeholder-svg"
        >
          <line className={styles('line')} x1="0" y1="0" x2="100%" y2="100%" strokeWidth={2} />
          <line className={styles('line')} x1="100%" y1="0" x2="0" y2="100%" strokeWidth={2} />
        </svg>
      )}
    </div>
  );
}

const styles = sx.create({
  placeholder: {
    backgroundColor: 'rgba(var(--sx-accent-1))',
    border: '2px solid rgba(var(--sx-accent-3))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  line: {
    stroke: 'rgba(var(--sx-accent-2))',
  },
  label: {
    color: 'rgba(var(--sx-accent-3))',
    fontWeight: 'bold',
  },
});
