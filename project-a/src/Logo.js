// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Heading from './design/Heading';
import KochkaIcon from './design/svg/KochkaIcon';

type Props = {|
  +horizontal?: boolean,
|};

export default function Logo(props: Props): React.Node {
  const isHorizontal = props.horizontal === true;
  return (
    <div className={styles('logoWrapper', isHorizontal && 'logoWrapperHorizontal')}>
      <KochkaIcon size={150} />

      <div className={styles('heading', isHorizontal && 'headingHorizontal')}>
        <Heading className={styles('kochka')}>
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
    marginTop: 40,
    marginBottom: 40,
  },
  logoWrapperHorizontal: {
    flexDirection: 'row',
  },
  heading: {
    marginTop: 40,
    fontFamily: 'GidoleKochka',
  },
  headingHorizontal: {
    marginTop: 20,
    marginLeft: 40,
  },
  kochka: {
    fontSize: 60,
    letterSpacing: '.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cafe: {
    fontSize: 25,
    letterSpacing: '.4rem',
  },
});
