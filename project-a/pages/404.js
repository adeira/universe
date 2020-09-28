// @flow

import Head from 'next/head';
import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Heading from '../src/design/Heading';
import Link from '../src/Link';

export default function Custom404(): React.Node {
  // TODO: log this page and the reason why it happened

  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Page Not Found (404)
        </title>
      </Head>

      <div className={styles('root')}>
        <main className={styles('center')}>
          <Heading>
            <fbt desc="page not found heading">Page Not Found</fbt>
          </Heading>
          <p>
            <fbt desc="page not found explanation">
              Page you are trying to access could not be found. It could happen because the page was
              deleted or we have a broken link somewhere.
            </fbt>
          </p>
          <p>
            <Link href="/">
              <fbt desc="go back to homepage link title">Go back to Homepage</fbt>
            </Link>
          </p>
        </main>
      </div>
    </>
  );
}

const styles = sx.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--main-bg-color)',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '50vw',
  },
});
