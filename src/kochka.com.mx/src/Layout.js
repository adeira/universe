// @flow

import { invariant } from '@adeira/js';
import Head from 'next/head';
import * as React from 'react';
import sx from '@adeira/sx';
import { Heading } from '@adeira/sx-design';

import LayoutFooter from './LayoutFooter';
import LayoutNavigation from './LayoutNavigation';

type Props =
  | {
      +children: React.Node,
      +title: React.Node,
      +subtitle?: React.Node,
      +withFullWidth?: boolean,
      +withHiddenTitle?: false,
    }
  | {
      +children: React.Node,
      +title?: React.Node,
      +subtitle?: React.Node,
      +withFullWidth?: boolean,
      +withHiddenTitle: true,
    };

export default function Layout(props: Props): React.Node {
  if (props.withHiddenTitle === true) {
    invariant(props.title == null, 'Cannot use `title` together with `withHiddenTitle` property.');
    invariant(
      props.subtitle == null,
      'Cannot use `subtitle` together with `withHiddenTitle` property.',
    );
  }

  return (
    <>
      {/* https://github.com/gajus/eslint-plugin-flowtype/pull/477 */}
      {/* https://github.com/gajus/eslint-plugin-flowtype/pull/478 */}
      {/* eslint-disable-next-line flowtype/require-readonly-react-props */}
      <Head>
        <title>KOCHKA café · {props.title}</title>
      </Head>

      <div className={styles('wrapper')}>
        <LayoutNavigation />

        {props.withHiddenTitle === true ? null : (
          <div className={styles('heading')}>
            <Heading>{props.title}</Heading>
            <div className={styles('subtitle')}>{props.subtitle}</div>
          </div>
        )}

        <main id="main" className={styles('main', props.withFullWidth && 'mainFullWidth')}>
          {props.children}
        </main>

        <footer className={styles('footer')}>
          <LayoutFooter />
        </footer>
      </div>
    </>
  );
}

const styles = sx.create({
  wrapper: {
    padding: 0,
    margin: 0,
  },
  main: {
    color: 'rgba(var(--font-color-dark))',
    maxWidth: '45rem',
    margin: '0 auto',
    minHeight: '40vh',
    paddingTop: '5vw',
    paddingBottom: '5vw',
  },
  mainFullWidth: {
    maxWidth: '100%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  heading: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'paddingTop': '2rem',
    'paddingBottom': '2rem',
    'backgroundColor': 'rgba(var(--secondary-color))',
    'backgroundImage': 'url(/plus-pattern.svg)',
    'backgroundPosition': '15px 15px',
    'backgroundSize': '20px',
    '--sx-foreground': 'rgba(var(--font-color-light))', // overwrite SX Design colors
  },
  subtitle: {
    color: 'lightgray',
  },
  footer: {
    color: 'rgba(var(--font-color-dark))',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});
