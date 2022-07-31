// @flow

import { NextSeo } from 'next-seo';
import * as React from 'react';
import fbt from 'fbt';

import Link from '../src/primitives/Link';
import Layout from '../src/Layout';

export default function Custom404(): React.Node {
  // TODO: log this page and the reason why it happened

  return (
    <>
      <NextSeo noindex={true} />

      <Layout title={<fbt desc="page not found title">Page Not Found</fbt>} subtitle="404">
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
      </Layout>
    </>
  );
}
