// @flow

import React, { type Node, type Element } from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import { MediaQueryMotion } from '../MediaQueries';

function SvgRect(props): Element<'rect'> {
  return (
    <rect
      x={props.x}
      y={props.y}
      width="20"
      height="20"
      rx="4"
      className={styles('svgRect')}
      data-testid={props['data-testid']}
    />
  );
}

export default function Loader(): Node {
  return (
    <div aria-label={<fbt desc="loading aria label">Loading</fbt>}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 60"
        aria-hidden={true}
        className={styles('svg')}
      >
        <SvgRect x="0" y="20" data-testid="loader-dot1" />
        <SvgRect x="50" y="20" data-testid="loader-dot2" />
        <SvgRect x="100" y="20" data-testid="loader-dot3" />
      </svg>
    </div>
  );
}

const bounce = sx.keyframes({
  '33%': { transform: `translateY(-10px)` },
  '66%': { transform: `translateY(10px)` },
});

const styles = sx.create({
  svg: {
    height: 30,
  },
  svgRect: {
    'fill': 'rgba(var(--sx-foreground))',
    'animationName': bounce,
    'animationFillMode': 'both',
    'animationIterationCount': 'infinite',
    'animationTimingFunction': 'ease-in-out',
    'transform': 'translateY(10px)',
    ':nth-child(1)': {
      animationDelay: '140ms',
    },
    ':nth-child(2)': {
      animationDelay: '70ms',
    },
    [MediaQueryMotion.NO_PREFERENCE]: {
      animationDuration: '0.6s',
    },
    [MediaQueryMotion.REDUCE]: {
      animationDuration: '1s',
    },
  },
});
