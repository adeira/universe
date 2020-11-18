// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Simple, { code as codeSimple } from './buttons/Simple';
import Pill, { code as codePill } from './buttons/Pill';
import Outline, { code as codeOutline } from './buttons/Outline';
import Bordered, { code as codeBordered } from './buttons/Bordered';
import Disabled, { code as codeDisabled } from './buttons/Disabled';
import Plastic, { code as codePlastic } from './buttons/Plastic';
import Elevated, { code as codeElevated } from './buttons/Elevated';
import Groups, { code as codeGroups } from './buttons/Groups';
import Icons, { code as codeIcons } from './buttons/Icons';
import Showcase from '../components/Showcase';

export default function Buttons(): Node {
  return (
    <Layout title="Buttons">
      <P>
        Examples of building buttons with Tailwind CSS. Compare with{' '}
        <Link href="https://tailwindcss.com/components/buttons">originals on Tailwind CSS</Link>.
      </P>

      <H2>Simple</H2>
      <Showcase code={codeSimple}>
        <Simple />
      </Showcase>

      <H2>Pill</H2>
      <Showcase code={codePill}>
        <Pill />
      </Showcase>

      <H2>Outline</H2>
      <Showcase code={codeOutline}>
        <Outline />
      </Showcase>

      <H2>Bordered</H2>
      <Showcase code={codeBordered}>
        <Bordered />
      </Showcase>

      <H2>Disabled</H2>
      <Showcase code={codeDisabled}>
        <Disabled />
      </Showcase>

      <H2>3D</H2>
      <Showcase code={codePlastic}>
        <Plastic />
      </Showcase>

      <H2>Elevated</H2>
      <Showcase code={codeElevated}>
        <Elevated />
      </Showcase>

      <H2>Groups</H2>
      <Showcase code={codeGroups}>
        <Groups />
      </Showcase>

      <H2>Icons</H2>
      <Showcase code={codeIcons}>
        <Icons />
      </Showcase>
    </Layout>
  );
}
