// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import Head from 'next/head';
import fbt from 'fbt';

import Heading from '../src/design/Heading';
import Money from '../src/design/Money';
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
        <div className={styles('menuGrid')}>
          <Section>
            <Heading>
              <div className={styles('menuHeading')}>
                <fbt desc="sweet dumplings subtitle in our menu">Sweet Dumplings</fbt>
              </div>
            </Heading>
            <div className={styles('priceRow')}>
              <div>
                <fbt desc="sweet dumpling with ferrero flavor">Ferrero</fbt>
              </div>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with blackberry/philadephia flavor">
                Blackberry + Philadelpia
              </fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with oreo/white chocolate flavor">
                Oreo + White Chocolate
              </fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with banana/condensed milk flavor">
                Banana + Condensed Milk
              </fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with strawberry/coconut flavor">Strawberry + coconut</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
          </Section>

          <Section>
            <Heading>
              <div className={styles('menuHeading')}>
                <fbt desc="savory dumplings subtitle in our menu">Savory Dumplings</fbt>
              </div>
            </Heading>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with pizza flavor">Pizza</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with chorizo/cheese flavor">Chorizo + cheese</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="sweet dumpling with hawaiano flavor">Hawaiano</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
          </Section>

          <Section>
            <Heading>
              <div className={styles('menuHeading')}>
                <fbt desc="coffee subtitle in our menu">Coffee</fbt>
              </div>
            </Heading>
            <div className={styles('priceRow')}>
              <fbt desc="coffee espresso">Espresso</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="coffee americano">Americano</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="coffee cappuccino">Cappuccino</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="coffee latte">Latte</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
            <div className={styles('priceRow')}>
              <fbt desc="coffee flat white">Flat White</fbt>
              <div>
                <Money amount={30} />
              </div>
            </div>
          </Section>

          <Section>
            <Heading>
              <div className={styles('menuHeading')}>
                <fbt desc="other subtitle in our menu">Other</fbt>
              </div>
            </Heading>
            <div className={styles('priceRow')}>
              <fbt desc="other soda">
                <em>TODO</em>
              </fbt>
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
    marginBottom: 10,
  },
  menuGrid: {
    'margin': '0 auto',
    'display': 'grid',
    'gridTemplateRows': 'auto',
    'gap': '2rem',
    'gridTemplateColumns': 'repeat(2, [start] minmax(300px, 450px) [end])',
    '@media (max-width: 840px)': {
      gridTemplateColumns: 'repeat(1, [start] minmax(300px, 450px) [end])',
    },
  },
  menuHeading: {
    textTransform: 'uppercase',
    marginBottom: 15,
  },
});
