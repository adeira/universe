// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { Section } from '@adeira/sx-design';

import Link from './Link';
import Navigation from './Navigation';
import StatusBar from './StatusBar';

type Props = {|
  +children: Node,
  +heading?: Node,
  +links?: $ReadOnlyArray<{|
    +href: string,
    +title: FbtWithoutString,
  |}>,
|};

export default function Layout(props: Props): Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('navigation')}>
        <Navigation />
      </div>

      <main className={styles('main')}>
        <StatusBar />

        {props.heading ?? null}

        <div className={styles('links')}>
          {props.links
            ? props.links.map((link, index) => {
                return (
                  <Link key={index} href={link.href} xstyle={styles.link}>
                    {link.title}
                  </Link>
                );
              })
            : null}
        </div>

        <Section>{props.children}</Section>
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
  },
  navigation: {
    flex: 1,
    width: '200px',
    position: 'fixed',
  },
  main: {
    flex: 1,
    marginLeft: '200px',
    backgroundColor: 'white',
    padding: '1rem',
  },
  links: {
    marginBottom: '2rem',
  },
  link: {
    'cursor': 'pointer',
    'padding': '.5rem 1rem',
    'borderRadius': 4,
    'border': '1px solid #e9eff3',
    ':hover': {
      backgroundColor: '#e9eff3',
    },
  },
});
