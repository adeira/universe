// @flow

import { type Node } from 'react';

import BaseInputWrapper from './BaseInputWrapper';
import SlateEditor from './SlateEditor';
import useFormFieldStateWithoutValidation from './useFormFieldStateWithoutValidation';

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
  const [inputValue, updateInputValue] = useFormFieldStateWithoutValidation(
    props.name,
    props.value,
  );

  const handleOnChange = (slatePayload) => {
    updateInputValue(slatePayload);
  };

  return (
    <BaseInputWrapper
      label={props.label}
      disableSemanticLabel={true} // needed for the complex Slate editor (implicit label would not work)
      required={false}
      hasValidationError={false} // TODO
      validationError={null} // TODO
    >
      <SlateEditor value={inputValue} onChange={handleOnChange} />
    </BaseInputWrapper>
  );
}
