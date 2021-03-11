// @flow

import React, { type Node } from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import LinkButton from './LinkButton';

type Props = {
  +onClick: () => void,
  +confirmMessage: FbtWithoutString,
  +children: FbtWithoutString,
  +xstyle?: AllCSSProperties,
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
    <LinkButton
      onClick={() => handleLinkButtonClick(props.confirmMessage, props.onClick)}
      xstyle={styles.linkButton}
    >
      <span className={sx(props.xstyle)}>{props.children}</span>
    </LinkButton>
  );
}

const styles = sx.create({
  linkButton: {
    'cursor': 'pointer',
    'padding': '.5rem 1rem',
    'borderRadius': 4,
    'border': '1px solid #e9eff3',
    'backgroundColor': '#e9eff3',
    'marginRight': '.5rem',
    ':hover': {
      color: '#3b85ff',
    },
  },
});
