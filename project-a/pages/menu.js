// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import Head from 'next/head';
import fbt from 'fbt';

import Heading from '../src/design/Heading';
import Section from '../src/design/Section';
import Footer from '../src/Footer';
import SubpageHeader from '../src/SubpageHeader';
import SubpageNavigation from '../src/SubpageNavigation';

export default function MenuPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Menu
        </title>
      </Head>

      <div className={styles('wrapper')}>
        <SubpageNavigation />
        <SubpageHeader />

        <main id="main" className={styles('main')}>
          {/* TODO: H1! */}
          <Heading>
            <fbt desc="menu page title">Menu</fbt>
          </Heading>
          <div className={styles('content')}>
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
          </div>

          {/* TODO: position somewhere below */}
          <Footer />
        </main>
      </div>
    </>
  );
}

const styles = sx.create({
  // hr: {
  //   border: 0,
  //   height: 1,
  //   backgroundImage:
  //     'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
  //   width: 250,
  //   margin: 50,
  // },
  wrapper: {
    padding: 0,
    margin: 0,
  },
  main: {
    color: 'black', // TODO
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
  },
});
