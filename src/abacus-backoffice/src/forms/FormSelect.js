// @flow

import { fbt } from 'fbt';
import React, { type Node, type ChildrenArray } from 'react';

import FormSelectOption from './FormSelectOption';
import BaseSelect from './private/BaseSelect';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'value': string,
  +'children': ChildrenArray<RestrictedElement<typeof FormSelectOption>>,
  +'required'?: boolean,
  +'data-testid'?: string,
};

export default function FormSelect(props: Props): Node {
  return (
    <BaseSelect
      label={props.label}
      name={props.name}
      value={props.value}
      required={props.required}
      data-testid={props['data-testid']}
    >
      <FormSelectOption value="">
        <fbt desc="empty select placeholder" doNotExtract={true}>
          --
        </fbt>
      </FormSelectOption>
      {props.children}
    </BaseSelect>
  );
}
