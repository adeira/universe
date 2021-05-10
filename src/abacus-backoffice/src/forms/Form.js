// @flow

import * as React from 'react';

import InputFiles from './InputFiles';
import InputNumber from './InputNumber';
import InputText from './InputText';
import SelectMultiple from './SelectMultiple';
import FormSubmit from './FormSubmit';

type Props = {
  +children: React.ChildrenArray<
    | RestrictedElement<typeof InputFiles>
    | RestrictedElement<typeof InputNumber>
    | RestrictedElement<typeof InputText>
    | RestrictedElement<typeof SelectMultiple>
    | RestrictedElement<typeof FormSubmit>,
  >,
};

export default function Form(props: Props): React.Element<'form'> {
  return (
    <form
      noValidate={true} // we use our custom validation
    >
      {props.children}
    </form>
  );
}
