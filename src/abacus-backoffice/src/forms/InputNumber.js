// @flow

import { type Node } from 'react';

import Input from './private/Input';

type Props = {
  +value: number,
  +label: FbtWithoutString,
  +name: string,

  // Validations (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#client-side_validation):
  +required?: boolean, // default `false`
  +min?: number,
};

/**
 * A control for entering a number. Displays a spinner and adds default validation when supported.
 * Displays a numeric keypad in some devices with dynamic keypads.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
 */
export default function InputNumber(props: Props): Node {
  return (
    <Input
      type="number"
      value={props.value}
      label={props.label}
      name={props.name}
      required={props.required}
      min={props.min}
    />
  );
}
