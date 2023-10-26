// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import type { Node } from 'react';

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
      <div className={styles('icon')}>
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
            stroke="#3840D1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12C4.13401 12 1 15.134 1 19H15C15 15.134 11.866 12 8 12Z"
            stroke="#3840D1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={styles({
          label: true,
          labelFocused: props.inputFocused === true, // TODO: or when already prefilled
          labelError: props.hasValidationError,
        })}
      >
        {props.label}
        {props.required === true ? <> *</> : null}
      </div>

      {props.children}

      {props.hasValidationError ? (
        <div className={styles('error')}>
          <small>{props.validationError}</small>
        </div>
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
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '12px',
    left: '19px',
  },
  label: {
    display: 'block',
    color: 'rgba(var(--sx-accent-6))', // TODO: fix
    cursor: 'default',
    position: 'absolute',
    top: '12px',
    left: '46px',
    transition: '0.1s',
    pointerEvents: 'none',
  },
  labelFocused: {
    top: '-6px',
    left: '19px',
    fontSize: '.75rem',
    padding: '0px 2px',
    backgroundColor: '#fff',
  },
  labelError: {
    color: 'var(--wlcm-error)',
  },
  error: {
    color: 'var(--wlcm-error)',
    textTransform: 'initial',
  },
});
