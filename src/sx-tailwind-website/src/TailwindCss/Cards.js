// @flow

import * as React from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Stacked from './cards/Stacked';
import Horizontal from './cards/Horizontal';

export default function Cards(): React.Node {
  return (
    <Layout title="Cards">
      <P>
        Examples of building card components with Tailwind CSS. Compare with{' '}
        <Link href="https://tailwindcss.com/components/cards">originals on Tailwind CSS</Link>.
      </P>

      <H2>Stacked</H2>
      <Stacked />

      <H2>Horizontal</H2>
      <Horizontal />
    </Layout>
  );
}
