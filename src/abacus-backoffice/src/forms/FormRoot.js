// @flow

import * as React from 'react';

import FormMultiSelect from './FormMultiSelect';
import FormMultiUpload from './FormMultiUpload';
import FormNumber from './FormNumber';
import FormSubmit from './FormSubmit';
import FormText from './FormText';

type Props = {
  +children: React.ChildrenArray<
    | RestrictedElement<typeof FormMultiSelect>
    | RestrictedElement<typeof FormMultiUpload>
    | RestrictedElement<typeof FormNumber>
    | RestrictedElement<typeof FormSubmit>
    | RestrictedElement<typeof FormText>,
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
