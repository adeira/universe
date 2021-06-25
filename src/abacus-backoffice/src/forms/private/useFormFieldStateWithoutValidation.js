// @flow

import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { formStateAtomFamily, formStateAtomFamilyIds } from './formState';

type InputValue = $FlowFixMe;

// This is the core of these forms - it registers each individual field to Recoil and manages its
// state. Check `useFormFieldState` hook if you want complete logic with HTML5 validation.
export default function useFormFieldStateWithoutValidation(
  inputName: string,
  inputValue: InputValue,
): [
  InputValue, // field value
  (InputValue) => void, // field value updater
] {
  const [fieldState, setFieldState] = useRecoilState(formStateAtomFamily(inputName));
  const setInputStateIds = useSetRecoilState(formStateAtomFamilyIds);

  useEffect(() => {
    // Register the input ID so we can read it later.
    setInputStateIds((previous) => [...previous, inputName]);

    // Register the input value.
    setFieldState(inputValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputName, setFieldState, setInputStateIds]);

  function updateInputValue(newInputValue) {
    // Register the new input value.
    setFieldState(newInputValue);
  }

  return [fieldState ?? inputValue, updateInputValue];
}
