// @flow

import { type Node } from 'react';

import BaseTextArea from './private/BaseTextArea';

type SlatePayload = $ReadOnlyArray<$FlowFixMe>;

type Props = {
  +value: ?SlatePayload,
  +label: FbtWithoutString,
  +name: string,
};

/**
 * A multi-line plain-text editing control, useful when you want to allow users to enter a sizeable
 * amount of free-form text, for example a comment on a review or feedback form.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
export default function FormTextArea(props: Props): Node {
  const emptySlateValue = [{ type: 'paragraph', children: [{ text: '' }] }];
  return (
    <BaseTextArea value={props.value ?? emptySlateValue} label={props.label} name={props.name} />
  );
}
