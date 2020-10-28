// @flow

import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import * as sx from '@adeira/sx';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Traditional from './alerts/Traditional';
import ModernWithBadge from './alerts/ModernWithBadge';
import LeftAccentBorder from './alerts/LeftAccentBorder';
import Titled from './alerts/Titled';
import Solid from './alerts/Solid';
import TopAccentBorder from './alerts/TopAccentBorder';
import Banner from './alerts/Banner';

export default function Alerts(): React.Node {
  return (
    <Layout title="Alerts">
      <P>
        Examples of building alert components with SX Tailwind. Compare with{' '}
        <Link href="https://tailwindcss.com/components/alerts">originals on Tailwind CSS</Link>.
      </P>

      <H2>Traditional</H2>
      <Traditional />

      <H2>Modern with Badge</H2>
      <ModernWithBadge />

      <H2>Left Accent Border</H2>
      <LeftAccentBorder />

      <H2>Titled</H2>
      <Titled />

      <H2>Solid</H2>
      <Solid />

      <H2>Top Accent Border</H2>
      <TopAccentBorder />

      <H2>Banner</H2>
      <Banner />
    </Layout>
  );
}
