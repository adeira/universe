// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import KochkaIcon from './design/svg/KochkaIcon';

type Props = {
  +horizontal?: boolean,
  +size?: 'small' | 'large',
  +onWhiteBackground?: boolean,
};

export default function Logo(props: Props): React.Node {
  const isHorizontal = props.horizontal === true;
  const isSmall = props.size === 'small';
  return (
    <div className={styles('column', isHorizontal && 'row')}>
      <KochkaIcon size={isSmall ? 100 : 200} onWhiteBackground={props.onWhiteBackground} />

      <h1
        className={styles({
          h1: true,
          h1Horizontal: isHorizontal === true,
          column: true,
        })}
      >
        <span
          className={styles({
            kochka: isSmall === false,
            kochkaSmall: isSmall === true,
          })}
        >
          KOCHKA
        </span>

        <span
          className={styles({
            cafe: true,
            cafeSmall: isSmall === true,
          })}
        >
          {/* TODO: this should be even lighter (fontWeight:100) */}
          CAFÉ
        </span>
      </h1>
    </div>
  );
}

const styles = sx.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  h1: {
    margin: 0,
    fontFamily: 'GidoleKochka',
  },
  h1Horizontal: {
    marginInlineStart: 20,
  },
  kochka: {
    'letterSpacing': '0.05em',
    'fontSize': '6rem',
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    ':after': {
      content: '"®"',
      fontSize: '1rem',
    },
  },
  kochkaSmall: {
    'letterSpacing': '0.05em',
    'fontSize': '1.5rem',
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    ':after': {
      content: '"®"',
      fontSize: '0.5rem',
    },
  },
  cafe: {
    letterSpacing: '1.3em',
    textIndent: '1.3em',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  cafeSmall: {
    letterSpacing: '1.3em',
    textIndent: '1.3em',
    fontSize: '0.5rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});
