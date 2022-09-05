// @flow

import { useRef, useEffect, useContext, type Node } from 'react';

import FormRootContext from '../FormRootContext';
import useFormFieldState from './useFormFieldState';

type PropsBase = {
  +'label': FbtWithoutString,
  +'name': string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
type PropsText = $ReadOnly<{
  ...PropsBase,
  +type: 'text',
  +value: string,
}>;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
type PropsEmail = $ReadOnly<{
  ...PropsBase,
  +type: 'email',
  +value: string,
}>;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password
type PropsPassword = $ReadOnly<{
  ...PropsBase,
  +type: 'password',
}>;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
type PropsNumber = $ReadOnly<{
  ...PropsBase,
  +type: 'number',
  +value: number,
  +min?: number,
  +max?: number,
  +step?: number | 'any',
}>;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
type PropsFile = $ReadOnly<{
  ...PropsBase,
  +type: 'file',
  +multiple: boolean,
  +accept: string,
}>;

type Props = PropsText | PropsEmail | PropsPassword | PropsNumber | PropsFile;

/**
 * This is a generic input component with very wide API (similar to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
 * It's not recommended to use this component directly. Instead, use `FormText`, `FormNumber`, …
 */
export default function BaseInput(props: $ReadOnly<Props>): Node {
  const inputRef = useRef(null);
  const formRootContext = useContext(FormRootContext);
  const [inputValue, updateInputValue, inputErrors] = useFormFieldState(
    inputRef,
    props.name,
    props.type === 'file' ? [] : props.value,
    props.label,
  );

  const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    if (props.type === 'file') {
      formRootContext.setUploadables(event.currentTarget.files);
    }

    updateInputValue(
      inputRef,
      props.type === 'file'
        ? Array.from(event.currentTarget.files ?? []).map((file) => file.name)
        : event.currentTarget.value,
    );
  };

  const hasError =
    inputErrors.validationError != null && inputErrors.validationErrorHidden === false;

  // eslint-disable-next-line prefer-object-spread
  const extraConditionalProps = Object.assign(
    ({}: $FlowFixMe),
    props.type === 'number' ? { min: props.min, max: props.max, step: props.step } : {},
    props.type === 'file'
      ? { accept: props.accept, multiple: props.multiple }
      : { value: inputValue },
  );

  // TODO:
  useEffect(() => {
    if (hasError === true) {
      props.onDisplayValidationError(inputErrors.validationError);
    } else {
      props.onHideValidationError(inputErrors.validationError);
    }
  }, [hasError]);

  return (
    <input
      data-testid={props['data-testid']}
      className={props.className}
      ref={inputRef}
      type={props.type}
      name={props.name}
      onChange={handleOnChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      required={props.required}
      {...extraConditionalProps}
    />
  );
}
