// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import StartingColor, { code as codeStartingColor } from './gradients/StartingColor';
import EndingColor, { code as codeEndingColor } from './gradients/EndingColor';
import MiddleColor, { code as codeMiddleColor } from './gradients/MiddleColor';
import TextBackground, { code as codeTextBackground } from './gradients/TextBackground';
import Showcase from '../components/Showcase';

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
      <Showcase code={codeStartingColor}>
        <StartingColor />
      </Showcase>

      <H2>Ending color</H2>
      <Showcase code={codeEndingColor}>
        <EndingColor />
      </Showcase>

      <H2>Middle color</H2>
      <Showcase code={codeMiddleColor}>
        <MiddleColor />
      </Showcase>

      <H2>Text background</H2>
      <Showcase code={codeTextBackground}>
        <TextBackground />
      </Showcase>
    </Layout>
  );
}
