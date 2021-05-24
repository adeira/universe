// @flow

import { useRef, type Node, type ChildrenArray } from 'react';
import sx from '@adeira/sx';

import FormMultiSelectOption from './FormMultiSelectOption';
import BaseInputWrapper from './private/BaseInputWrapper';
import useFormFieldState from './private/useFormFieldState';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'size': number,
  +'value': $ReadOnlyArray<string>,
  +'children': ChildrenArray<RestrictedElement<typeof FormMultiSelectOption>>,
  +'data-testid'?: string,
  +'required'?: boolean,
};

export default function FormMultiSelect(props: Props): Node {
  const selectRef = useRef(null);
  const [inputValue, updateInputValue] = useFormFieldState(
    selectRef,
    props.name,
    props.value,
    props.label,
  );

  const handleOnChange = (event) => {
    const selectedOptions = [];
    Array.from(event.target.options).forEach((option) => {
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    });
    updateInputValue(selectRef, selectedOptions);
  };

  return (
    <BaseInputWrapper
      label={props.label}
      required={props.required}
      hasValidationError={false}
      validationError={null}
    >
      <select
        data-testid={props['data-testid']}
        className={styles('select')}
        ref={selectRef}
        required={props.required}
        value={inputValue}
        onChange={handleOnChange}
        multiple={true}
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
    height: 40,
  },
});
