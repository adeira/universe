// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import Link from './Link';

type Props = {|
  +href: string,
  +children: FbtWithoutString,
|};

// creates <a href="…" />
export default function LayoutHeadingLink(props: Props): Node {
  return (
    <Link href={props.href} xstyle={styles.link}>
      {props.children}
    </Link>
  );
}

const styles = sx.create({
  link: {
    'cursor': 'pointer',
    'padding': '.5rem 1rem',
    'borderRadius': 4,
    'border': '1px solid #e9eff3',
    'backgroundColor': '#e9eff3',
    'marginRight': '.5rem',
    ':hover': {
      color: '#3b85ff',
    },
  },
});
