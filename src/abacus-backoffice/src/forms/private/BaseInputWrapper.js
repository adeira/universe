// @flow

import { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';

type Props = {
  +label: FbtWithoutString,
  +hasValidationError: boolean,
  +validationError: FbtWithoutString | null,
  +children: Node,
  +required?: boolean,
};

export default function BaseInputWrapper(props: Props): Node {
  return (
    <div className={styles('inputWrapper')}>
      <label>
        <div
          className={styles({
            label: true,
            labelError: props.hasValidationError,
          })}
        >
          {props.label}
          {props.required === true ? (
            <>
              {' '}
              <abbr
                title={<fbt desc="mandatory field description">This field is mandatory</fbt>}
                aria-label="required"
              >
                <strong>*</strong>
              </abbr>
            </>
          ) : null}
        </div>

        {props.children}

        {props.hasValidationError ? (
          <div className={styles('error')}>{props.validationError}</div>
        ) : null}
      </label>
    </div>
  );
}

const styles = sx.create({
  inputWrapper: {
    marginBottom: '1rem',
    width: '100%',
  },
  label: {
    display: 'block',
    textTransform: 'uppercase',
    fontSize: '.75rem',
    color: 'rgba(var(--sx-accent-6))',
  },
  labelError: {
    color: 'rgba(var(--sx-error))',
  },
  error: {
    color: 'rgba(var(--sx-error))',
    textTransform: 'initial',
  },
});
