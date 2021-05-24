// @flow

import { isNumeric } from '@adeira/js';
import { fbt } from 'fbt';

// See: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
export default function getValidityStateMessage(
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
  targetLabel: FbtWithoutString,
): FbtWithoutString | null {
  if (target?.validity.valid === true) {
    return null;
  }

  if (target?.validity.valueMissing === true) {
    // A Boolean that is true if the element has a required attribute, but no value, or false
    // otherwise. If true, the element matches the :invalid CSS pseudo-class.
    return (
      <fbt desc="value missing validation error message">
        Field &quot;<fbt:param name="form field label">{targetLabel}</fbt:param>&quot; is required.
        Please fill in this field.
      </fbt>
    );
  } else if (target?.validity.rangeOverflow === true) {
    // A Boolean that is true if the value is greater than the maximum specified by the max attribute,
    // or false if it is less than or equal to the maximum. If true, the element matches the :invalid
    // and :out-of-range and CSS pseudo-classes.
    if (target.max === '0') {
      return (
        <fbt desc="range overflow validation error message">
          Field &quot;<fbt:param name="form field label">{targetLabel}</fbt:param>&quot; must be
          negative.
        </fbt>
      );
    }
    return (
      <fbt desc="range overflow validation error message">
        Field &quot;<fbt:param name="form field label">{targetLabel}</fbt:param>&quot; has to have
        value smaller than <fbt:param name="form field min value">{target.max}</fbt:param>.
      </fbt>
    );
  } else if (target?.validity.rangeUnderflow === true) {
    // A Boolean that is true if the value is less than the minimum specified by the min attribute,
    // or false if it is greater than or equal to the minimum. If true, the element matches the
    // :invalid and :out-of-range CSS pseudo-classes.
    if (target.min === '0') {
      return (
        <fbt desc="range underflow validation error message">
          Field &quot;<fbt:param name="form field label">{targetLabel}</fbt:param>&quot; must be
          positive.
        </fbt>
      );
    }
    return (
      <fbt desc="range underflow validation error message">
        Field &quot;<fbt:param name="form field label">{targetLabel}</fbt:param>&quot; has to have
        value larger than <fbt:param name="form field min value">{target.min}</fbt:param>.
      </fbt>
    );
  } else if (target?.validity.stepMismatch === true && target instanceof HTMLInputElement) {
    // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch
    const inputStep = isNumeric(target.step) ? Number(target.step) : 1;
    const inputValue = Number(target.value);
    const inputMin = Number(target.min);

    const remainder = (inputValue - inputMin) % inputStep;
    const lowBoundary = inputValue - remainder;
    const highBoundary = lowBoundary + inputStep;

    return (
      <fbt desc="step mismatch validation error message">
        Please enter a valid value. The two nearest valid values are{' '}
        <fbt:param name="low boundary">{lowBoundary}</fbt:param> and{' '}
        <fbt:param name="high boundary">{highBoundary}</fbt:param>.
      </fbt>
    );
  }

  // We should avoid getting into this generic error state as much as possible.
  return (
    <fbt desc="generic validation error message">
      Field &quot;<fbt:param name="form field label">{targetLabel}</fbt:param>&quot; is invalid.
    </fbt>
  );
}
