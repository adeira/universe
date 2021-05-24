// @flow

import { type Node } from 'react';

import Input from './private/Input';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'accept': string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * A control that lets the user select multiple files. Use the accept attribute to define the types
 * of files that the control can select.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 */
export default function FormMultiUpload(props: Props): Node {
  return (
    <Input
      data-testid={props['data-testid']}
      type="file"
      multiple={true}
      label={props.label}
      name={props.name}
      required={props.required}
      accept={props.accept}
    />
  );
}
