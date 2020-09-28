// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import Head from 'next/head';
import fbt from 'fbt';

import Heading from '../../src/design/Heading';
import Section from '../../src/design/Section';
import Subpage from '../../src/Subpage';

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
        <div className={styles('row')}>
          <Section className={styles('column')}>
            <Heading>
              <span className={styles('heading')}>
                <fbt desc="sweet dumplings subtitle in our menu">Sweet Dumplings</fbt>
              </span>
            </Heading>
            <div>Todododo $30</div>
            <div>Todododo $30</div>
          </Section>

          <Section className={styles('column')}>
            <Heading>
              <span className={styles('heading')}>
                <fbt desc="savory dumplings subtitle in our menu">Savory Dumplings</fbt>
              </span>
            </Heading>
            <div>Todododo $30</div>
            <div>Todododo $30</div>
          </Section>
        </div>

        <div className={styles('row')}>
          <Section className={styles('column')}>
            <Heading>
              <span className={styles('heading')}>
                <fbt desc="coffee subtitle in our menu">Coffee</fbt>
              </span>
            </Heading>
            <div>Todododo $30</div>
            <div>Todododo $30</div>
          </Section>
        </div>
      </Subpage>
    </>
  );
}

const styles = sx.create({
  row: {
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'space-evenly',
    // width: '100%',
    'marginBottom': 30,
    ':last-child': {
      marginBottom: 0,
    },
  },
  column: {
    'display': 'flex',
    'flexDirection': 'column',
    'marginRight': 30,
    ':last-child': {
      marginRight: 0,
    },
  },
  heading: {
    textTransform: 'uppercase',
  },
});
