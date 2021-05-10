// @flow

import { type Node } from 'react';

import Input from './private/Input';

type Props = {
  +value: ?string,
  +label: FbtWithoutString,
  +name: string,

  // Validations (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#client-side_validation):
  +required?: boolean, // default `false`
};

/**
 * A single-line text field. Line-breaks are automatically removed from the input value.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
 */
export default function InputText(props: Props): Node {
  return (
    <Input
      type="text"
      value={props.value ?? ''}
      label={props.label}
      name={props.name}
      required={props.required}
    />
  );
}
