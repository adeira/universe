// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Heading from './design/Heading';
import NavigationBack from './design/svg/NavigationBack';

type Props = {|
  +children: React.Node,
  +heading: React.Node,
|};

export default function Subpage(props: Props): React.Node {
  return (
    <div className={styles('wrapper')}>
      <div className={styles('subpageNavigation')}>
        <div className={styles('subpageNavigationButton')}>
          <NavigationBack />
          <div>
            <fbt desc="link back to homepage">homepage</fbt>
          </div>
        </div>

        <Heading>{props.heading}</Heading>
      </div>

      <main id="main" className={styles('contentWrapper')}>
        {props.children}
      </main>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  subpageNavigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  subpageNavigationButton: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'fontVariant': 'all-small-caps',
    'fontSize': 14,
    'padding': 10,
    ':hover': {
      backgroundColor: 'var(--main-bg-colorHover)',
    },
  },
  contentWrapper: {
    maxWidth: 750,
    margin: '0 auto',
  },
});
