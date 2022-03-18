// @flow

import React, { type Node } from 'react';
import { LayoutBlock, Text } from '@adeira/sx-design';

import OpenPositionUnavailableWarning from './OpenPositionUnavailableWarning';

type Props = {
  +title: FbtWithoutString,
  +descriptionComponent: Node,
};

export default function OpenPosition(props: Props): Node {
  return (
    <LayoutBlock>
      <Text as="h2">{props.title}</Text>
      <OpenPositionUnavailableWarning />
      <div>{props.descriptionComponent}</div>
    </LayoutBlock>
  );
}
