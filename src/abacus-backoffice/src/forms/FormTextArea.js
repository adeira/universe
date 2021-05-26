// @flow

import { type Node } from 'react';

import BaseTextArea from './private/BaseTextArea';

type Props = {
  +'value': ?string,
  +'label': FbtWithoutString,
  +'name': string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * A multi-line plain-text editing control, useful when you want to allow users to enter a sizeable
 * amount of free-form text, for example a comment on a review or feedback form.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
export default function FormTextArea(props: Props): Node {
  return (
    <BaseTextArea
      data-testid={props['data-testid']}
      value={props.value ?? ''}
      label={props.label}
      name={props.name}
      required={props.required}
    />
  );
}
