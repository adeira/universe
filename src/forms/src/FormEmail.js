// @flow

import { type Node } from 'react';

import BaseInput from './private/BaseInput';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'value'?: ?string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * A single-line email field.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
 */
export default function FormEmail(props: Props): Node {
  return (
    <BaseInput
      data-testid={props['data-testid']}
      type="email"
      value={props.value ?? ''}
      label={props.label}
      name={props.name}
      required={props.required}
    />
  );
}
