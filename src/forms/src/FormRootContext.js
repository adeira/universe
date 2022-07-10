// @flow

import { createContext, type Context } from 'react';
import type { UploadableMap } from '@adeira/relay';

export type FormRootContextType = {
  +formFields: { ... },
  +uploadables: UploadableMap,

  // adds new form field to the context
  +registerFormField: (
    inputName: string,
    inputValue: string,
    inputRef: $FlowFixMe,
    validationError: FbtWithoutString | null,
    validationErrorHidden: boolean,
  ) => void,

  // update the registered form field with a new value
  +updateFormField: (
    inputName: string,
    inputValue: string,
    validationError: FbtWithoutString | null,
    validationErrorHidden: boolean,
  ) => void,

  // unmasks hidden form field errors (they are hidden by default)
  +unmaskFormFieldErrors: () => void,

  // set Relay uploadables to be later used in mutations
  +setUploadables: ($FlowFixMe) => void,
};

export default (createContext({
  formFields: {},
  uploadables: {},
  registerFormField: () => {},
  updateFormField: () => {},
  unmaskFormFieldErrors: () => {},
  setUploadables: () => {},
}): Context<FormRootContextType>);
