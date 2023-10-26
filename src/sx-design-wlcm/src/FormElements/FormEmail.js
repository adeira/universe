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
 * A single-line email field.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
 */
export default function FormEmail(props: Props): Node {
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
        type="email"
        value={props.value ?? ''}
        label={props.label}
        name={props.name}
        required={props.required}
        // TODO:
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
    padding: '12px 19px',
  },
  inputError: {
    border: '2px solid var(--wlcm-error)',
  },
});
