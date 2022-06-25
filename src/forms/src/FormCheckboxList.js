// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import BaseInputWrapper from './private/BaseInputWrapper';
import useFormFieldStateWithoutValidation from './private/useFormFieldStateWithoutValidation';

type ValueID = string;

type Props = {
  +name: string,
  +label: FbtWithoutString,
  +availableValues: { +[value_id: ValueID]: string },
  +selectedValues?: $ReadOnlyArray<ValueID>,
};

export default function FormCheckboxList(props: Props): Node {
  const [inputValue, updateInputValue] = useFormFieldStateWithoutValidation(
    props.name,
    props.selectedValues ?? [],
  );

  const handleCheckboxClick = (event) => {
    const target = event.target;
    updateInputValue((previousCheckedOptions) => {
      if (target.checked === true) {
        if (previousCheckedOptions.indexOf(target.value) === -1) {
          // add a new (unique) element to the array
          return [...previousCheckedOptions, target.value];
        }
      }
      // delete it from the array if unchecked
      return [...previousCheckedOptions].filter((e) => e !== target.value);
    });
  };

  return (
    <BaseInputWrapper
      label={props.label}
      disableSemanticLabel={true}
      hasValidationError={false}
      validationError={null}
    >
      <div className={styles('wrapper')}>
        {Object.keys(props.availableValues).map((key) => {
          const label = props.availableValues[key];
          return (
            <div key={key}>
              <input
                type="checkbox"
                id={key}
                name={props.name}
                value={key}
                checked={inputValue.includes(key)}
                onChange={handleCheckboxClick}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          );
        })}
      </div>
    </BaseInputWrapper>
  );
}

const styles = sx.create({
  wrapper: {
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
    padding: 16,
  },
});
