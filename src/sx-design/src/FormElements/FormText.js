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

  const hasError = validationError != null;

  return (
    <BaseInputWrapper
      label={props.label}
      required={props.required}
      hasValidationError={hasError}
      validationError={validationError}
    >
      <BaseInput
        data-testid={props['data-testid']}
        className={styles({
          input: true,
          inputError: hasError,
        })}
        type="text"
        value={props.value ?? ''}
        label={props.label}
        name={props.name}
        required={props.required}
        // TODO:
        onFocus={() => {}}
        onDisplayValidationError={(error) => setValidationError(error)}
        onHideValidationError={() => setValidationError(null)}
      />
    </BaseInputWrapper>
  );
}

const styles = sx.create({
  input: {
    width: '100%',
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
    padding: '8px 12px',
  },
  inputError: {
    border: '2px solid rgba(var(--sx-error))',
  },
});
