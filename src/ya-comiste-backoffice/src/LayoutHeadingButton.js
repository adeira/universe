// @flow

import React, { type Node } from 'react';
import { Button } from '@adeira/sx-design';

type Props = {
  +onClick: () => void,
  +confirmMessage: FbtWithoutString,
  +children: FbtWithoutString,
};

// creates <button onClick="…" />
export default function LayoutHeadingButton(props: Props): Node {
  const handleLinkButtonClick = (confirmMessage, callback) => {
    if (
      window.confirm(confirmMessage) // eslint-disable-line no-alert,no-undef
    ) {
      callback();
    }
  };

  return (
    <Button onClick={() => handleLinkButtonClick(props.confirmMessage, props.onClick)}>
      {props.children}
    </Button>
  );
}
