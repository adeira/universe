// @flow

import { type Node } from 'react';

import BaseInput from './private/BaseInput';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password
 */
export default function FormPassword(props: Props): Node {
  return (
    <BaseInput
      data-testid={props['data-testid']}
      type="password"
      label={props.label}
      name={props.name}
      required={props.required}
    />
  );
}
