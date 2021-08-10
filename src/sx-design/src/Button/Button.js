// @flow

import Icon from '@adeira/icons';
import * as React from 'react';

import sharedButtonStyles from './styles';

type Props = {
  +'children': Fbt,
  +'onClick': (event: SyntheticEvent<HTMLButtonElement>) => void,
  +'type'?:
    | 'submit' // The button submits the form data to the server.
    | 'reset' // The button resets all the controls to their initial values (this behavior tends to annoy users).
    | 'button', // The button has no default behavior, and does nothing when pressed by default (use `onClick` callback).
  +'tint'?: 'default' | 'secondary' | 'error' | 'success' | 'warning',
  +'isDisabled'?: boolean,
  +'data-testid'?: string,
  +'size'?: 'small' | 'medium' | 'large',
  +'prefix'?: RestrictedElement<typeof Icon>,
  +'suffix'?: RestrictedElement<typeof Icon>,
};

/**
 * Creates a traditional HTML button with the correct attributes.
 */
export default function Button(props: Props): React.Element<'button'> {
  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      // eslint-disable-next-line react/button-has-type
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.isDisabled === true}
      data-testid={props['data-testid']}
      className={sharedButtonStyles({
        buttonBase: true,
        buttonSmall: props.size === 'small',
        buttonMedium: props.size == null || props.size === 'medium',
        buttonLarge: props.size === 'large',
        buttonTintDefault: props.tint == null || props.tint === 'default',
        buttonTintSecondary: props.tint === 'secondary',
        buttonTintError: props.tint === 'error',
        buttonTintSuccess: props.tint === 'success',
        buttonTintWarning: props.tint === 'warning',
        buttonDisabled: props.isDisabled === true,
      })}
    >
      {props.prefix != null ? <>{props.prefix} </> : null}
      {props.children}
      {props.suffix != null ? <> {props.suffix}</> : null}
    </button>
  );
}
