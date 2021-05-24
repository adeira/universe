// @flow

import { useEffect, type ElementRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  formStateAtomFamily,
  formStateAtomFamilyErrors,
  formStateAtomFamilyIds,
} from './formState';
import getValidityStateMessage from './getValidityStateMessage';

type InputRef = { current: ElementRef<'input' | 'select' | 'textarea'> | null };
type InputValue = string | number | $ReadOnlyArray<string>;

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
  const [fieldState, setFieldState] = useRecoilState(formStateAtomFamily(inputName));
  const setInputStateIds = useSetRecoilState(formStateAtomFamilyIds);
  const [inputErrorsState, setInputErrorsState] = useRecoilState(
    formStateAtomFamilyErrors(inputName),
  );

  useEffect(() => {
    // Register the input ID so we can read it later.
    setInputStateIds((previous) => [...previous, inputName]);

    // Register the input value.
    setFieldState(inputValue);

    // Check whether the input is valid after the initial render.
    setInputErrorsState({
      validationError: getValidityStateMessage(inputRef.current, inputLabel),
      validationErrorHidden: true, // by default hidden
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLabel, inputName, setFieldState, setInputErrorsState, setInputStateIds]);

  function updateInputValue(newInputRef, newInputValue) {
    // Register the new input value.
    setFieldState(newInputValue);

    // Check whether the input is valid after the user changed it.
    setInputErrorsState({
      validationError: getValidityStateMessage(newInputRef.current, inputLabel),
      validationErrorHidden: false,
    });
  }

  return [fieldState ?? inputValue, updateInputValue, inputErrorsState];
}
