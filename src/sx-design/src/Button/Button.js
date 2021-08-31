// @flow

import Icon from '@adeira/icons';
import { invariant } from '@adeira/js';
import * as React from 'react';

import sharedButtonStyles from './styles';

type Props = {
  +'children': Fbt | RestrictedElement<typeof Icon>,
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
  +'aria-label'?: Fbt,
};

/**
 * Creates a traditional HTML button with the correct attributes.
 */
export default function Button(props: Props): React.Element<'button'> {
  const childrenCount = React.Children.count(props.children);
  if (childrenCount === 1) {
    React.Children.forEach(props.children, (child) => {
      if (child.type === Icon) {
        // This is a case where the only Button children is an Icon. Normally, the ARIA label
        // would be derived from the Button text, but this special case breaks accessibility
        // since there is no text to start with.
        invariant(
          props['aria-label'] != null,
          'Icon is the only Button child so ARIA label property must be specified.',
        );
      }
    });
  }

  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      // eslint-disable-next-line react/button-has-type
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.isDisabled === true}
      aria-disabled={props.isDisabled === true}
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
      aria-label={props['aria-label']}
    >
      {props.prefix != null ? <>{props.prefix} </> : null}
      {props.children}
      {props.suffix != null ? <> {props.suffix}</> : null}
    </button>
  );
}
