// @flow

import React, { type Node } from 'react';
import { Badge, LayoutBlock, LayoutInline, Link, Text } from '@adeira/sx-design';

type Props = {
  +title: FbtWithoutString,
  +description: FbtWithoutString,
  +badges?: $ReadOnlyArray<RestrictedElement<typeof Badge>>,
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
    </LayoutBlock>
  );
}
