// @flow

import { type Node, type ChildrenArray } from 'react';

import FormSelectOption from './FormSelectOption';
import BaseSelect from './private/BaseSelect';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'size': number,
  +'value': $ReadOnlyArray<string>,
  +'children': ChildrenArray<RestrictedElement<typeof FormSelectOption>>,
  +'data-testid'?: string,
  +'required'?: boolean,
};

export default function FormMultiSelect(props: Props): Node {
  return (
    <BaseSelect
      label={props.label}
      name={props.name}
      size={props.size}
      multiple={true}
      value={props.value}
      required={props.required}
      data-testid={props['data-testid']}
    >
      {props.children}
    </BaseSelect>
  );
}
