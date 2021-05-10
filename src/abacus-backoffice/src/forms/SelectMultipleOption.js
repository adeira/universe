// @flow

import { type Node } from 'react';

type Props = {
  +value: string,
  +children: FbtWithoutString,
};

export default function SelectMultipleOption(props: Props): Node {
  return <option value={props.value}>{props.children}</option>;
}
