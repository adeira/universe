// @flow

import React, { type Node } from 'react';
import { ButtonLink } from '@adeira/sx-design';

type Props = {
  +href: string,
  +children: FbtWithoutString,
};

// creates <a href="…" />
export default function LayoutHeadingLink(props: Props): Node {
  return <ButtonLink href={props.href}>{props.children}</ButtonLink>;
}
