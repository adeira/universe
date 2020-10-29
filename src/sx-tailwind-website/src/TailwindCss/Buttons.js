// @flow

import * as React from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Simple from './buttons/Simple';
import Pill from './buttons/Pill';
import Outline from './buttons/Outline';
import Bordered from './buttons/Bordered';
import Disabled from './buttons/Disabled';
import Plastic from './buttons/Plastic';
import Elevated from './buttons/Elevated';
import Groups from './buttons/Groups';
import Icons from './buttons/Icons';

export default function Buttons(): React.Node {
  return (
    <Layout title="Buttons">
      <P>
        Examples of building buttons with Tailwind CSS. Compare with{' '}
        <Link href="https://tailwindcss.com/components/buttons">originals on Tailwind CSS</Link>.
      </P>

      <H2>Simple</H2>
      <Simple />

      <H2>Pill</H2>
      <Pill />

      <H2>Outline</H2>
      <Outline />

      <H2>Bordered</H2>
      <Bordered />

      <H2>Disabled</H2>
      <Disabled />

      <H2>3D</H2>
      <Plastic />

      <H2>Elevated</H2>
      <Elevated />

      <H2>Groups</H2>
      <Groups />

      <H2>Icons</H2>
      <Icons />
    </Layout>
  );
}
