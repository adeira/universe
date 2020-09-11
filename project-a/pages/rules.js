// @flow

import * as React from 'react';
import Head from 'next/head';
import fbt from 'fbt';
import * as sx from '@adeira/sx';

import Heading from '../src/design/Heading';
import NavigationBack from '../src/design/svg/NavigationBack';
import Rules from '../src/Rules';

export default function RulesPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Our rules
        </title>
      </Head>

      <div className={styles('wrapper')}>
        <div className={styles('subpageNavigation')}>
          <div className={styles('subpageNavigationButton')}>
            <NavigationBack />
            <div>
              <fbt desc="link back to homepage">homepage</fbt>
            </div>
          </div>

          <Heading>Our rules</Heading>
        </div>

        <main id="main" className={styles('contentWrapper')}>
          <Rules />
        </main>
      </div>
    </>
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
