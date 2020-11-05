// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Transition from './transitions/Transition';
import Duration from './transitions/Duration';
import Timing from './transitions/Timing';
import Delay from './transitions/Delay';

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
      <Transition />

      <H2>Duration</H2>
      <Duration />

      <H2>Timing function</H2>
      <Timing />

      <H2>Delay</H2>
      <Delay />
    </Layout>
  );
}
