// @flow

import { useEffect, type ElementRef } from 'react';
import { useRecoilState } from 'recoil';

import { formStateAtomFamilyErrors } from './formState';
import getValidityStateMessage from './getValidityStateMessage';
import useFormFieldStateWithoutValidation from './useFormFieldStateWithoutValidation';

type InputRef = { current: ElementRef<'input' | 'select' | 'textarea'> | null };
type InputValue = $FlowFixMe;

// Basically a wrapper around `useFormFieldStateWithoutValidation` adding HTML5 validation. Use it
// when you are able to provide input React reference for the validation (otherwise do it manually).
export default function useFormFieldState(
  inputRef: InputRef,
  inputName: string,
  inputValue: InputValue,
  inputLabel: FbtWithoutString,
): [
  InputValue, // field value
  (InputRef, InputValue) => void, // field value updater
  $FlowFixMe, // field errors
] {
  const [fieldState, setFieldState] = useFormFieldStateWithoutValidation(inputName, inputValue);
  const [inputErrorsState, setInputErrorsState] = useRecoilState(
    formStateAtomFamilyErrors(inputName),
  );

  useEffect(() => {
    // Check whether the input is valid after the initial render.
    setInputErrorsState({
      validationError: getValidityStateMessage(inputRef.current, inputLabel),
      validationErrorHidden: true, // by default hidden
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLabel, setInputErrorsState]);

  function updateInputValue(newInputRef, newInputValue) {
    // Register the new input value.
    setFieldState(newInputValue);

    // Check whether the input is valid after the user changed it.
    setInputErrorsState({
      validationError: getValidityStateMessage(newInputRef.current, inputLabel),
      validationErrorHidden: false,
    });
  }

  return [fieldState, updateInputValue, inputErrorsState];
}
