// @flow

import React, { type Node } from 'react';
import { Link } from '@adeira/sx-design';

type Props = {
  +href: string,
  +children: FbtWithoutString,
};

// creates <a href="…" />
export default function LayoutHeadingLink(props: Props): Node {
  // TODO: create a new ButtonLink (?)
  return <Link href={props.href}>{props.children}</Link>;
}
