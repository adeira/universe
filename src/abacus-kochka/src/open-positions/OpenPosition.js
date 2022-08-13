// @flow

import React, { type Node } from 'react';
import { LayoutBlock, LayoutInline, Text } from '@adeira/sx-design';

import Link from '../primitives/Link';
import MinimumRequirements from './MinimumRequirements';

type Props = {
  +title: FbtWithoutString,
  +description: FbtWithoutString,
  +badges?: $ReadOnlyArray<Node>,
  +googleFormURL?: string,
};

export default function OpenPosition(props: Props): Node {
  return (
    <LayoutBlock>
      <Text as="h2">{props.title}</Text>

      {props.badges != null ? <LayoutInline>{props.badges}</LayoutInline> : null}

      {props.googleFormURL != null ? (
        <Text weight={700}>
          👉 Apply here:{' '}
          <Link href={props.googleFormURL} target="_blank">
            Google Forms
          </Link>
        </Text>
      ) : null}

      <Text>{props.description}</Text>

      <MinimumRequirements />
    </LayoutBlock>
  );
}
