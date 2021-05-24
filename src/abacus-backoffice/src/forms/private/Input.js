// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { useRef, type Node } from 'react';
import { useSetRecoilState } from 'recoil';

import { formStateUploadables } from './formState';
import useFormFieldState from './useFormFieldState';

type PropsBase = {
  +'label': FbtWithoutString,
  +'name': string,
  +'data-testid'?: string,
  +'required'?: boolean, // default `false`
};

type Props =
  | {
      // <input type="text" />
      ...PropsBase,
      +type: 'text',
      +value: string,
    }
  | {
      // <input type="number" />
      ...PropsBase,
      +type: 'number',
      +value: number,
      +min?: number,
      +max?: number,
    }
  | {
      // <input type="file" />
      ...PropsBase,
      +type: 'file',
      +multiple: boolean,
      +accept: string,
    };

/**
 * This is a generic input component with very wide API (similar to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
 * It's not recommended to use this component directly. Instead, use `InputText`, `InputNumber`, …
 */
export default function Input(props: $ReadOnly<Props>): Node {
  const inputRef = useRef(null);
  const setUploadables = useSetRecoilState(formStateUploadables);
  const [inputValue, updateInputValue, inputErrors] = useFormFieldState(
    inputRef,
    props.name,
    props.type === 'file' ? [] : props.value,
    props.label,
  );

  const handleOnChange = (event) => {
    if (props.type === 'file') {
      setUploadables(event.target.files);
    }

    updateInputValue(
      inputRef,
      props.type === 'file'
        ? Array.from(event.target.files ?? []).map((file) => file.name)
        : event.target.value,
    );
  };

  const hasError =
    inputErrors.validationError != null && inputErrors.validationErrorHidden === false;

  // eslint-disable-next-line prefer-object-spread
  const extraConditionalProps = Object.assign(
    {},
    props.type === 'number' ? { min: props.min, max: props.max } : {},
    props.type === 'file'
      ? { accept: props.accept, multiple: props.multiple }
      : { value: inputValue },
  );

  return (
    <div className={styles('inputWrapper')}>
      <label
        className={styles({
          label: true,
          labelError: hasError,
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

        <input
          data-testid={props['data-testid']}
          className={styles({
            input: true,
            inputError: hasError,
          })}
          ref={inputRef}
          type={props.type}
          name={props.name}
          onChange={handleOnChange}
          required={props.required}
          {...extraConditionalProps}
        />

        {hasError ? <div className={styles('error')}>{inputErrors.validationError}</div> : null}
      </label>
    </div>
  );
}

const styles = sx.create({
  inputWrapper: {
    marginBottom: '1rem',
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
  input: {
    width: '100%',
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
    height: 40,
    padding: '0px 12px',
  },
  inputError: {
    border: '2px solid rgba(var(--sx-error))',
  },
  error: {
    color: 'rgba(var(--sx-error))',
    textTransform: 'initial',
  },
});
