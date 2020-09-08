// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Rules from '../src/Rules';
import NavigationBack from '../src/svg/NavigationBack';
import NavigationClose from '../src/svg/NavigationClose';

export default function RulesPage(): React.Node {
  return (
    <div className={styles('wrapper')}>
      <div className={styles('subpageNavigation')}>
        <div className={styles('subpageNavigationButton')}>
          <NavigationBack />
          <div>
            <fbt desc="link back to homepage">homepage</fbt>
          </div>
        </div>

        {/* TODO: heading component */}
        <div>
          <h1>Our rules</h1>
        </div>

        <div className={styles('subpageNavigationButton')}>
          <NavigationClose />
          <div>
            <fbt desc="link to close the page">close</fbt>
          </div>
        </div>
      </div>

      <div className={styles('contentWrapper')}>
        <Rules />
      </div>
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
