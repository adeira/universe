// @flow

import { useRef, type Node, type ChildrenArray } from 'react';
import sx from '@adeira/sx';

import useFormFieldState from './private/useFormFieldState';
import FormMultiSelectOption from './FormMultiSelectOption';

type Props = {
  +'label': FbtWithoutString,
  +'name': string,
  +'size': number,
  +'value': $ReadOnlyArray<string>,
  +'children': ChildrenArray<RestrictedElement<typeof FormMultiSelectOption>>,
  +'data-testid'?: string,
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
    <div className={styles('inputWrapper')}>
      <label className={styles('label')}>
        {props.label}
        <select
          data-testid={props['data-testid']}
          className={styles('select')}
          ref={selectRef}
          value={inputValue}
          onChange={handleOnChange}
          multiple={true}
          size={props.size}
        >
          {props.children}
        </select>
      </label>
    </div>
  );
}

const styles = sx.create({
  // TODO: DRY with <Input />
  inputWrapper: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    textTransform: 'uppercase',
    fontSize: '.75rem',
    color: 'rgba(var(--sx-accent-6))',
  },
  select: {
    width: '100%',
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
    height: 40,
  },
});
