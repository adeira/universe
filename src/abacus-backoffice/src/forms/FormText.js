// @flow

import { type Node } from 'react';

import Input from './private/Input';

type Props = {
  +'value': ?string,
  +'label': FbtWithoutString,
  +'name': string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * A single-line text field. Line-breaks are automatically removed from the input value.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
 */
export default function FormText(props: Props): Node {
  return (
    <Input
      data-testid={props['data-testid']}
      type="text"
      value={props.value ?? ''}
      label={props.label}
      name={props.name}
      required={props.required}
    />
  );
}
