// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Ping from './animations/Ping';
import Spin from './animations/Spin';
import Pulse from './animations/Pulse';
import Bounce from './animations/Bounce';

export default function Animations(): Node {
  return (
    <Layout title="Animations">
      <P>
        Examples of building animations with SX Tailwind. Compare with{' '}
        <Link href="https://tailwindcss.com/docs/animation">originals on Tailwind CSS</Link>.
      </P>

      <H2>Ping</H2>
      <Ping />

      <H2>Spin</H2>
      <Spin />

      <H2>Pulse</H2>
      <Pulse />

      <H2>Bounce</H2>
      <Bounce />
    </Layout>
  );
}
