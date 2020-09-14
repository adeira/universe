// @flow

import * as React from 'react';
import Head from 'next/head';
import fbt from 'fbt';

import Heading from '../src/design/Heading';
import Section from '../src/design/Section';
import Subpage from '../src/Subpage';

export default function MenuPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Menu
        </title>
      </Head>

      <Subpage title={<fbt desc="menu page title">Menu</fbt>}>
        <Section>
          <Heading>
            <fbt desc="sweet dumplings title in our menu">Sweet Dumplings</fbt>
          </Heading>
        </Section>
        <Section>
          <Heading>
            <fbt desc="savory dumplings in our menu">Savory Dumplings</fbt>
          </Heading>
        </Section>
      </Subpage>
    </>
  );
}
