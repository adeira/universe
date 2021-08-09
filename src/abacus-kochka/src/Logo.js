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
    <div className={styles('logoWrapper', isHorizontal && 'logoWrapperHorizontal')}>
      <KochkaIcon size={isSmall ? 100 : 200} onWhiteBackground={props.onWhiteBackground} />

      <div className={styles('heading', isHorizontal && 'headingHorizontal')}>
        <h1 className={styles('h1', isSmall ? 'kochkaSmall' : 'kochka')}>
          KOCHKA
          <span className={styles('cafe', isSmall && 'cafeSmall')}>
            {/* TODO: this should be even lighter (fontWeight:100) */}
            CAFÉ
          </span>
        </h1>
      </div>
    </div>
  );
}

const styles = sx.create({
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoWrapperHorizontal: {
    flexDirection: 'row',
  },
  heading: {
    fontFamily: 'GidoleKochka',
  },
  headingHorizontal: {
    marginInlineStart: 20,
  },
  kochka: {
    letterSpacing: '0.05em',
    fontSize: '100px',
    lineHeight: '113px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  kochkaSmall: {
    fontSize: '25px',
    letterSpacing: '0.05em',
    fontStyle: 'normal',
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cafe: {
    letterSpacing: '1.3em',
    fontSize: '25px',
    lineHeight: '28px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  cafeSmall: {
    letterSpacing: '1.3em',
    fontSize: '7px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  h1: {
    margin: 0,
  },
});
