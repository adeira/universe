// @flow

import { type Node } from 'react';

type Props = {
  +'value':
    | null // empty
    | string,
  +'children': FbtWithoutString,
  +'data-testid'?: string,
};

export default function FormSelectOption(props: Props): Node {
  return (
    <option data-testid={props['data-testid']} value={props.value ?? ''}>
      {props.children}
    </option>
  );
}
