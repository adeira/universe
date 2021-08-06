// @flow

import Icon from '@adeira/icons';
import React, { type Node } from 'react';
import { Button } from '@adeira/sx-design';

type Props = {
  +onClick: () => void,
  +confirmMessage: FbtWithoutString,
  +children: FbtWithoutString,
  +prefix?: RestrictedElement<typeof Icon>,
};

// TODO: move this `window.confirm` logic to SX Design (Button)?
export default function LayoutHeadingButton(props: Props): Node {
  const handleLinkButtonClick = (confirmMessage, callback) => {
    if (
      window.confirm(confirmMessage) // eslint-disable-line no-alert
    ) {
      callback();
    }
  };

  return (
    <Button
      onClick={() => handleLinkButtonClick(props.confirmMessage, props.onClick)}
      prefix={props.prefix}
    >
      {props.children}
    </Button>
  );
}
