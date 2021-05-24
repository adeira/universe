// @flow

import { type Node } from 'react';

type Props = {
  +'value': string,
  +'children': FbtWithoutString,
  +'data-testid'?: string,
};

export default function FormMultiSelectOption(props: Props): Node {
  return (
    <option data-testid={props['data-testid']} value={props.value}>
      {props.children}
    </option>
  );
}
