// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { Heading } from '@adeira/sx-design';

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
        <Heading xstyle={isSmall ? styles.kochkaSmall : styles.kochka}>
          KOCHKA
          <span className={styles('cafe', isSmall && 'cafeSmall')}>
            {/* TODO: this should be even lighter (fontWeight:100) */}
            CAFÉ
          </span>
        </Heading>
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
    'marginTop': '2rem',
    'fontFamily': 'GidoleKochka',
    '--sx-foreground': 'rgba(var(--font-color-light))', // overwrite SX Design colors
  },
  headingHorizontal: {
    marginLeft: 20,
  },
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
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
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
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
});
