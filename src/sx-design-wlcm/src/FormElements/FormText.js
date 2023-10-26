// @flow

import sx from '@adeira/sx';
import { BaseInput } from '@adeira/forms';
import { useState, type Node } from 'react';

import BaseInputWrapper from './private/BaseInputWrapper';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'value'?: ?string,
  +'data-testid'?: string,
  +'required'?: boolean,
};

/**
 * A single-line text field. Line-breaks are automatically removed from the input value.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
 */
export default function FormText(props: Props): Node {
  const [validationError, setValidationError] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  const hasError = validationError != null;

  return (
    <BaseInputWrapper
      label={props.label}
      required={props.required}
      hasValidationError={hasError}
      validationError={validationError}
      inputFocused={inputFocused}
    >
      <BaseInput
        data-testid={props['data-testid']}
        className={styles({
          input: true,
          inputFocus: inputFocused === true,
          inputError: hasError,
        })}
        type="text"
        value={props.value ?? ''}
        label={props.label}
        name={props.name}
        required={props.required}
        // TODO:
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onDisplayValidationError={(error) => setValidationError(error)}
        onHideValidationError={() => setValidationError(null)}
      />
    </BaseInputWrapper>
  );
}

const styles = sx.create({
  input: {
    width: '100%',
    border: '2px solid var(--wlcm-primary)',
    borderRadius: 'var(--wlcm-radius)',
    padding: '12px 19px 12px 46px',
  },
  inputFocus: {
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
  inputError: {
    border: '2px solid var(--wlcm-error)',
  },
});
