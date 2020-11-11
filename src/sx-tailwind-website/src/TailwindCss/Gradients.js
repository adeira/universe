// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import StartingColor from './gradients/StartingColor';
import EndingColor from './gradients/EndingColor';
import MiddleColor from './gradients/MiddleColor';

export default function Gradients(): Node {
  return (
    <Layout title="Gradients">
      <P>
        Various background gradients. Compare with{' '}
        <Link href="https://tailwindcss.com/docs/gradient-color-stops">
          originals on Tailwind CSS
        </Link>
        .
      </P>

      <H2>Starting color</H2>
      <StartingColor />

      <H2>Ending color</H2>
      <EndingColor />

      <H2>Middle color</H2>
      <MiddleColor />
    </Layout>
  );
}
