// @flow

import { useEffect, useContext, type ElementRef } from 'react';

import FormRootContext from '../FormRootContext';
import getValidityStateMessage from './getValidityStateMessage';

type InputRef = { current: ElementRef<'input' | 'select' | 'textarea'> | null };
type InputValue = $FlowFixMe;

// This is the core of these forms - it registers each individual field to the form context and
// manages its state. It also adds HTML5 validation.
export default function useFormFieldState(
  inputRef: InputRef | null, // null when cannot provide on React ref (see FormCheckboxList)
  inputName: string,
  inputValue: InputValue,
  inputLabel: FbtWithoutString,
): [
  InputValue, // field value
  (InputRef, InputValue) => void, // field value updater
  $FlowFixMe, // field errors
] {
  const formRootContext = useContext(FormRootContext);

  useEffect(() => {
    formRootContext.registerFormField(
      inputName,
      inputValue,
      inputRef,
      inputRef != null ? getValidityStateMessage(inputRef.current, inputLabel) : null, // validationError
      true, // validationErrorHidden (by default hidden)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateInputValue(newInputRef: InputRef, newInputValue: InputValue) {
    formRootContext.updateFormField(
      inputName,
      newInputValue,
      inputRef != null ? getValidityStateMessage(inputRef.current, inputLabel) : null, // validationError
      false, // validationErrorHidden
    );
  }

  return [
    // $FlowFixMe[unnecessary-optional-chain] since v0.235.1
    // $FlowFixMe[invalid-computed-prop] since v0.235.1
    formRootContext.formFields[inputName]?.inputValue ?? inputValue,
    updateInputValue,
    {
      // $FlowFixMe[unnecessary-optional-chain] since v0.235.1
      // $FlowFixMe[invalid-computed-prop] since v0.235.1
      validationError: formRootContext.formFields[inputName]?.validationError ?? null,
      // $FlowFixMe[unnecessary-optional-chain] since v0.235.1
      // $FlowFixMe[invalid-computed-prop] since v0.235.1
      validationErrorHidden: formRootContext.formFields[inputName]?.validationErrorHidden ?? true,
    },
  ];
}
