// @flow

import Icon from '@adeira/icons';
import { invariant } from '@adeira/js';
import React, { type Element } from 'react';

type RestrictedReactNode = number | Fbt | Iterable<RestrictedReactNode>;

export type Props = {
  +'children': RestrictedReactNode | RestrictedElement<typeof Icon>,
  +'onClick': (event: SyntheticEvent<HTMLButtonElement>) => void,
  +'type'?:
    | 'submit' // The button submits the form data to the server.
    | 'reset' // The button resets all the controls to their initial values (this behavior tends to annoy users).
    | 'button', // The button has no default behavior, and does nothing when pressed by default (use `onClick` callback).
  +'isDisabled'?: boolean,
  +'data-testid'?: string,
  +'prefix'?: RestrictedElement<typeof Icon>,
  +'suffix'?: RestrictedElement<typeof Icon>,
  +'aria-label'?: Fbt,
};

/**
 * Creates a traditional HTML button with the correct attributes.
 *
 * ## Accessibility
 *
 * We intentionally do not use HTML `disabled` attribute because browsers are skipping disabled
 * elements while tabbing. Instead, we are preventing the `onClick` programmatically so users
 * can navigate the disabled buttons (see: https://css-tricks.com/making-disabled-buttons-more-inclusive/).
 */
export default function Button(
  props: $ReadOnly<{ ...Props, +className: ?string }>,
): Element<'button'> {
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

  const handleOnClick = (event) => {
    if (props.isDisabled !== true) {
      props.onClick(event);
    }
  };

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={props.type ?? 'button'}
      onClick={handleOnClick}
      aria-disabled={props.isDisabled === true}
      data-testid={props['data-testid']}
      className={props.className}
      aria-label={props['aria-label']}
    >
      {props.prefix != null ? <>{props.prefix} </> : null}
      {props.children}
      {props.suffix != null ? <> {props.suffix}</> : null}
    </button>
  );
}
