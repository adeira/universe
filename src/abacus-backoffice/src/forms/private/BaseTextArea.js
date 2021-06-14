// @flow

import { type Node, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import BaseInputWrapper from './BaseInputWrapper';
import { formStateAtomFamily, formStateAtomFamilyIds } from './formState';
import SlateEditor from './SlateEditor';

type SlatePayload = $ReadOnlyArray<$FlowFixMe>;

type Props = {
  +label: FbtWithoutString,
  +name: string,
  +value: SlatePayload,
};

/**
 * This is a generic input component with very wide API (similar to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).
 * It's not recommended to use this component directly. Instead, use `FormTextArea`.
 *
 * Note: we are using [Slate Editor](https://github.com/ianstormtaylor/slate) instead of traditional
 * `textarea` even though it currently doesn't have any advanced or fancy features. However, it's
 * ready for any future improvements and the resulting format is not just a plain string.
 */
export default function BaseTextArea(props: Props): Node {
  const [, setFieldState] = useRecoilState(formStateAtomFamily(props.name));
  const setInputStateIds = useSetRecoilState(formStateAtomFamilyIds);

  // Here we are trying to do essentially the same as in `useFormFieldState` except Slate doesn't
  // have any `ref` which could be accessed like with the other fields.
  useEffect(() => {
    setInputStateIds((previous) => [...previous, props.name]);
    setFieldState(props.value);
  }, [props.name, props.value, setFieldState, setInputStateIds]);

  const handleOnChange = (slatePayload) => {
    setFieldState(slatePayload);
  };

  return (
    <BaseInputWrapper
      label={props.label}
      required={false}
      hasValidationError={false} // TODO
      validationError={null} // TODO
    >
      <SlateEditor value={props.value} onChange={handleOnChange} />
    </BaseInputWrapper>
  );
}
