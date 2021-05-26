// @flow

import { type Node, useRef } from 'react';
import sx from '@adeira/sx';

import BaseInputWrapper from './BaseInputWrapper';
import useFormFieldState from './useFormFieldState';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'value': string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * This is a generic input component with very wide API (similar to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).
 * It's not recommended to use this component directly. Instead, use `FormTextArea`.
 * See: https://reactjs.org/docs/forms.html#the-textarea-tag
 */
export default function BaseTextArea(props: Props): Node {
  const textAreaRef = useRef(null);
  const [inputValue, updateInputValue, inputErrors] = useFormFieldState(
    textAreaRef,
    props.name,
    props.value,
    props.label,
  );

  const handleOnChange = (event) => {
    updateInputValue(textAreaRef, event.target.value);
  };

  const hasError =
    inputErrors.validationError != null && inputErrors.validationErrorHidden === false;

  return (
    <BaseInputWrapper
      label={props.label}
      required={props.required}
      hasValidationError={hasError}
      validationError={inputErrors.validationError}
    >
      <textarea
        ref={textAreaRef}
        data-testid={props['data-testid']}
        required={props.required}
        name={props.name}
        value={inputValue}
        onChange={handleOnChange}
        className={styles({
          textarea: true,
          textareaError: hasError,
        })}
      />
    </BaseInputWrapper>
  );
}

const styles = sx.create({
  textarea: {
    width: '100%',
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
    padding: '12px 12px',
  },
  textareaError: {
    border: '2px solid rgba(var(--sx-error))',
  },
});
