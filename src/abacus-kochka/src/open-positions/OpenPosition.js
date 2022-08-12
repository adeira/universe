// @flow

import React, { type Node } from 'react';
import { LayoutBlock, LayoutInline, Text } from '@adeira/sx-design';

import Link from '../primitives/Link';
import MinimumRequirements from './MinimumRequirements';

type Props = {
  +title: FbtWithoutString,
  +description: FbtWithoutString,
  +badges?: $ReadOnlyArray<Node>,
};

export default function OpenPosition(props: Props): Node {
  return (
    <LayoutBlock>
      <Text as="h2">{props.title}</Text>

      {props.badges != null ? <LayoutInline>{props.badges}</LayoutInline> : null}

      <Text>
        👉 Apply here:{' '}
        <Link href="https://forms.gle/JDKwgRiUK8yA7Bw5A" target="_blank">
          Talent Pool on Google Forms
        </Link>
      </Text>

      <Text>{props.description}</Text>

      <MinimumRequirements />
    </LayoutBlock>
  );
}
