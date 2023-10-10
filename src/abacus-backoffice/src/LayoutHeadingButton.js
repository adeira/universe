// @flow

import Icon from '@adeira/icons';
import React, { type Element, type Node } from 'react';
import { Button } from '@adeira/sx-design';

type Props = {
  +onClick: () => void,
  +confirmMessage: FbtWithoutString,
  +children: FbtWithoutString,
  +prefix?: Element<typeof Icon>,
};

// TODO: move this `window.confirm` logic to SX Design (Button)?
export default function LayoutHeadingButton(props: Props): Node {
  const handleLinkButtonClick = (confirmMessage: FbtWithoutString, callback: () => void) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(confirmMessage)) {
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
