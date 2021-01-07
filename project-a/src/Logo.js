// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Heading from './design/Heading';
import KochkaIcon from './design/svg/KochkaIcon';

type Props = {|
  +color?: string,
  +horizontal?: boolean,
|};

export default function Logo(props: Props): React.Node {
  const isHorizontal = props.horizontal === true;
  return (
    <div className={styles('logoWrapper', isHorizontal && 'logoWrapperHorizontal')}>
      <KochkaIcon size={50} color={props.color} />

      <div className={styles('heading', isHorizontal && 'headingHorizontal')}>
        <Heading xstyle={styles.kochka}>
          KOCHKA
          <span className={styles('cafe')}>
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
    fontFamily: 'GidoleKochka',
  },
  headingHorizontal: {
    marginLeft: 20,
  },
  // eslint-disable-next-line sx/no-unused-stylesheet
  kochka: {
    fontSize: 20,
    letterSpacing: '.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cafe: {
    fontSize: 10,
    letterSpacing: '.4rem',
  },
});
