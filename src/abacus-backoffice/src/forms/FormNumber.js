// @flow

import { type Node } from 'react';

import Input from './private/Input';

type Props = {
  +'value': number,
  +'label': FbtWithoutString,
  +'name': string,
  +'data-testid'?: string,
  +'required'?: boolean,
  +'min'?: number,
  +'max'?: number,
  +'step'?: number | 'any',
};

/**
 * A control for entering a number. Displays a spinner and adds default validation when supported.
 * Displays a numeric keypad in some devices with dynamic keypads.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
 */
export default function FormNumber(props: Props): Node {
  return (
    <Input
      data-testid={props['data-testid']}
      type="number"
      value={props.value}
      label={props.label}
      name={props.name}
      required={props.required}
      min={props.min}
      max={props.max}
      step={props.step ?? 'any'}
    />
  );
}
