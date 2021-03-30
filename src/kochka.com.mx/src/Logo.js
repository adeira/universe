// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { Heading } from '@adeira/sx-design';

import KochkaIcon from './design/svg/KochkaIcon';

type Props = {|
  +color?: string,
  +horizontal?: boolean,
  +size?: 'small' | 'large',
|};

export default function Logo(props: Props): React.Node {
  const isHorizontal = props.horizontal === true;
  const isSmall = props.size === 'small';
  return (
    <div className={styles('logoWrapper', isHorizontal && 'logoWrapperHorizontal')}>
      <KochkaIcon size={isSmall ? 50 : 150} color={props.color} />

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
    'fontFamily': 'GidoleKochka',
    '--sx-text-color': 'rgba(var(--font-color-light))', // overwrite SX Design colors
  },
  headingHorizontal: {
    marginLeft: 20,
  },
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
  kochka: {
    fontSize: 60,
    letterSpacing: '.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // FIXME:
  // eslint-disable-next-line sx/no-unused-stylesheet
  kochkaSmall: {
    fontSize: 20,
    letterSpacing: '.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cafe: {
    fontSize: 25,
    letterSpacing: '.4rem',
  },
  cafeSmall: {
    fontSize: 10,
  },
});
