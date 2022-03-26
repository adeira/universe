// @flow

import React, { type Node } from 'react';
import { Badge, LayoutBlock, LayoutInline, Text } from '@adeira/sx-design';

import OpenPositionAvailableNote from './OpenPositionAvailableNote';
import OpenPositionUnavailableWarning from './OpenPositionUnavailableWarning';

type Props = {
  +title: FbtWithoutString,
  +descriptionComponent: Node,
  +isCurrentlyAvailable: boolean,
  +badges?: $ReadOnlyArray<RestrictedElement<typeof Badge>>,
};

export default function OpenPosition(props: Props): Node {
  return (
    <LayoutBlock>
      <Text as="h2">{props.title}</Text>

      {props.badges != null ? <LayoutInline>{props.badges}</LayoutInline> : null}

      {props.isCurrentlyAvailable === true ? (
        <OpenPositionAvailableNote />
      ) : (
        <OpenPositionUnavailableWarning />
      )}
      <div>{props.descriptionComponent}</div>
    </LayoutBlock>
  );
}
