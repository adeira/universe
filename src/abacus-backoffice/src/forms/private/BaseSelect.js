// @flow

import { useRef, type Node, type ChildrenArray } from 'react';
import sx from '@adeira/sx';

import FormSelectOption from '../FormSelectOption';
import BaseInputWrapper from './BaseInputWrapper';
import useFormFieldState from './useFormFieldState';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'value':
    | string // for normal select
    | $ReadOnlyArray<string>, // for multi select
  +'children': ChildrenArray<RestrictedElement<typeof FormSelectOption>>,
  +'size'?: number,
  +'multiple'?: boolean,
  +'required'?: boolean,
  +'data-testid'?: string,
};

/**
 * This is a generic select component with very wide API (similar to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select).
 * It's not recommended to use this component directly. Instead, use `FormSelect`, `FormMultiSelect`, …
 */
export default function BaseSelect(props: Props): Node {
  const selectRef = useRef(null);
  const [inputValue, updateInputValue, inputErrors] = useFormFieldState(
    selectRef,
    props.name,
    props.value,
    props.label,
  );

  const handleOnChange = (event) => {
    if (props.multiple === true) {
      const selectedOptions = [];
      Array.from(event.target.options).forEach((option) => {
        if (option.selected) {
          selectedOptions.push(option.value);
        }
      });
      updateInputValue(selectRef, selectedOptions);
    } else {
      Array.from(event.target.options).forEach((option) => {
        if (option.selected) {
          updateInputValue(selectRef, option.value);
        }
      });
    }
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
      <select
        data-testid={props['data-testid']}
        className={styles({
          select: true,
          selectMulti: props.multiple === true,
          selectError: hasError,
        })}
        ref={selectRef}
        required={props.required}
        value={inputValue}
        onChange={handleOnChange}
        multiple={props.multiple}
        size={props.size}
      >
        {props.children}
      </select>
    </BaseInputWrapper>
  );
}

const styles = sx.create({
  select: {
    width: '100%',
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
    padding: '8px 12px',
  },
  selectMulti: {
    padding: 0,
  },
  selectError: {
    border: '2px solid rgba(var(--sx-error))',
  },
});
