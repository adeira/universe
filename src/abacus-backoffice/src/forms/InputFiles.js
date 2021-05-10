// @flow

import { type Node } from 'react';

import Input from './private/Input';

type Props = {
  +label: FbtWithoutString,
  +name: string,
  +accept: string,

  // Validations (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#client-side_validation):
  +required?: boolean, // default `false`
};

/**
 * A control that lets the user select multiple files. Use the accept attribute to define the types
 * of files that the control can select.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 */
export default function InputFiles(props: Props): Node {
  return (
    <Input
      type="file"
      multiple={true}
      label={props.label}
      name={props.name}
      required={props.required}
    />
  );
}
