// @flow

import * as sx from '@stylexjs/stylex';
import * as React from 'react';
import Link from 'next/link';

import './_app.css';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  return (
    <div>
      <Component {...pageProps} />

      <div {...sx.props(styles.navigation)}>
        <Link href="/newtab" {...sx.props(styles.navigationLink)}>
          Time
        </Link>
        {' · '}
        <Link href="/time-from-start-of-year" {...sx.props(styles.navigationLink)}>
          Elapsed Time
        </Link>
        {' · '}
        <Link href="/time-until-end-of-year" {...sx.props(styles.navigationLink)}>
          Remaining Time
        </Link>
      </div>
    </div>
  );
}

const styles = sx.create({
  navigation: {
    color: '#bbb',
    fontSize: '0.8em',
    marginBlockStart: '5em',
  },
  navigationLink: {
    color: '#bbb',
  },
});
