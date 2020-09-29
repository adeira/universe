// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import Head from 'next/head';
import fbt from 'fbt';

import Heading from '../../src/design/Heading';
import Money from '../../src/design/Money';
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
        <div className={styles('menuRow')}>
          <Section className={styles('menuColumn')}>
            <Heading>
              <span className={styles('menuHeading')}>
                <fbt desc="sweet dumplings subtitle in our menu">Sweet Dumplings</fbt>
              </span>
            </Heading>
            <div className={styles('priceRow')}>
              <div>
                <fbt desc="sweet dumpling with chocolate flavor">Chocolate</fbt>
              </div>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with strawberry flavor">Strawberry</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
          </Section>

          <Section className={styles('menuColumn')}>
            <Heading>
              <span className={styles('menuHeading')}>
                <fbt desc="savory dumplings subtitle in our menu">Savory Dumplings</fbt>
              </span>
            </Heading>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with pizza flavor">Pizza</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with manchego flavor">Manchego</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
          </Section>
        </div>

        <div className={styles('menuRow')}>
          <Section className={styles('menuColumn')}>
            <Heading>
              <span className={styles('menuHeading')}>
                <fbt desc="coffee subtitle in our menu">Coffee</fbt>
              </span>
            </Heading>
            <div className={styles('priceRow')}>
              <div>Todododo</div>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <div>Todododo</div>
              <div>
                <Money amount={30} />
              </div>
            </div>
          </Section>
        </div>
      </Subpage>
    </>
  );
}

const styles = sx.create({
  priceRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  menuRow: {
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'space-evenly',
    // 'width': '100%',
    'marginBottom': 30,
    ':last-child': {
      marginBottom: 0,
    },
  },
  menuColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'marginRight': 50,
    // 'width': '50%',
    ':last-child': {
      marginRight: 0,
    },
  },
  menuHeading: {
    textTransform: 'uppercase',
  },
});
