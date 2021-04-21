// @flow

import * as React from 'react';

import sharedButtonStyles from './styles';

type Props = {
  +'children': FbtWithoutString,
  +'onClick': () => void,
  +'tint'?: 'default' | 'error' | 'success' | 'warning',
  +'isDisabled'?: boolean,
  +'data-testid'?: string,
};

export default function Button(props: Props): React.Element<'button'> {
  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.isDisabled === true}
      data-testid={props['data-testid']}
      className={sharedButtonStyles({
        buttonBase: true,
        buttonTintDefault: props.tint == null || props.tint === 'default',
        buttonTintError: props.tint === 'error',
        buttonTintSuccess: props.tint === 'success',
        buttonTintWarning: props.tint === 'warning',
        buttonDisabled: props.isDisabled === true,
      })}
    >
      {props.children}
    </button>
  );
}
