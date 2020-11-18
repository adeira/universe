// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Transition, { code as codeTransition } from './transitions/Transition';
import Duration, { code as codeDuration } from './transitions/Duration';
import Timing, { code as codeTiming } from './transitions/Timing';
import Delay, { code as codeDelay } from './transitions/Delay';
import Showcase from '../components/Showcase';

export default function Transitions(): Node {
  return (
    <Layout title="Transitions">
      <P>
        Examples of building transitions with Tailwind CSS. Compare with{' '}
        <Link href="https://tailwindcss.com/docs/transition-property">
          originals on Tailwind CSS
        </Link>
        .
      </P>

      <H2>Transition</H2>
      <Showcase code={codeTransition}>
        <Transition />
      </Showcase>

      <H2>Duration</H2>
      <Showcase code={codeDuration}>
        <Duration />
      </Showcase>

      <H2>Timing function</H2>
      <Showcase code={codeTiming}>
        <Timing />
      </Showcase>

      <H2>Delay</H2>
      <Showcase code={codeDelay}>
        <Delay />
      </Showcase>
    </Layout>
  );
}
