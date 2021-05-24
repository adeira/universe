// @flow

import * as React from 'react';

import FormMultiSelect from './FormMultiSelect';
import FormMultiUpload from './FormMultiUpload';
import FormNumber from './FormNumber';
import FormSubmit from './FormSubmit';
import FormText from './FormText';
import FormTextArea from './FormTextArea';

type Props = {
  +children: React.ChildrenArray<
    | RestrictedElement<'div'> // allow additional styles inside `FormRoot`
    | RestrictedElement<typeof FormMultiSelect>
    | RestrictedElement<typeof FormMultiUpload>
    | RestrictedElement<typeof FormNumber>
    | RestrictedElement<typeof FormSubmit>
    | RestrictedElement<typeof FormText>
    | RestrictedElement<typeof FormTextArea>,
  >,
};

export default function FormRoot(props: Props): React.Element<'form'> {
  return (
    <form
      noValidate={true} // we use our custom validation
    >
      {props.children}
    </form>
  );
}
