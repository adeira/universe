// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Ping, { code as codePing } from './animations/Ping';
import Spin, { code as codeSpin } from './animations/Spin';
import Pulse, { code as codePulse } from './animations/Pulse';
import Bounce, { code as codeBounce } from './animations/Bounce';
import Showcase from '../components/Showcase';

export default function Animations(): Node {
  return (
    <Layout title="Animations">
      <P>
        Examples of building animations with SX Tailwind. Compare with{' '}
        <Link href="https://tailwindcss.com/docs/animation">originals on Tailwind CSS</Link>.
      </P>

      <H2>Ping</H2>
      <Showcase code={codePing}>
        <Ping />
      </Showcase>

      <H2>Spin</H2>
      <Showcase code={codeSpin}>
        <Spin />
      </Showcase>

      <H2>Pulse</H2>
      <Showcase code={codePulse}>
        <Pulse />
      </Showcase>

      <H2>Bounce</H2>
      <Showcase code={codeBounce}>
        <Bounce />
      </Showcase>
    </Layout>
  );
}
