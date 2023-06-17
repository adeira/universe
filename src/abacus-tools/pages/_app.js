// @flow

import * as React from 'react';
import Link from 'next/link';

import './_app.css';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  return (
    <div>
      <Component {...pageProps} />

      <style jsx>{`
        .navigation {
          margin-block-start: 5em;
          color: #bbb;
          font-size: 0.8em;
        }

        .navigation a {
          color: #bbb;
        }
      `}</style>

      <div className="navigation">
        <Link href="/newtab">Time</Link>
        {' · '}
        <Link href="/time-from-start-of-year">Elapsed Time</Link>
        {' · '}
        <Link href="/time-until-end-of-year">Remaining Time</Link>
      </div>
    </div>
  );
}
