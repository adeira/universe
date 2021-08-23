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

  // Removes semantic `<label />` in places where it doesn't make any sense (checkbox list for example).
  // Clicking on the form element label will not trigger any action (like focus or checkbox check).
  +disableSemanticLabel?: boolean,
};

export default function BaseInputWrapper(props: Props): Node {
  const input = (
    <>
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
    </>
  );

  return (
    <div className={styles('inputWrapper')}>
      {props.disableSemanticLabel === true ? input : <label>{input}</label>}
    </div>
  );
}

const styles = sx.create({
  inputWrapper: {
    marginBlockEnd: '1rem',
    width: '100%',
  },
  label: {
    display: 'block',
    textTransform: 'uppercase',
    fontSize: '.75rem',
    color: 'rgba(var(--sx-accent-6))',
    cursor: 'default',
  },
  labelError: {
    color: 'rgba(var(--sx-error))',
  },
  error: {
    color: 'rgba(var(--sx-error))',
    textTransform: 'initial',
  },
});
