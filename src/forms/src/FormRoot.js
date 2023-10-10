// @flow

import * as React from 'react';

import FormEmail from './FormEmail';
import FormErrorMessages from './FormErrorMessages';
import FormMultiSelect from './FormMultiSelect';
import FormMultiUpload from './FormMultiUpload';
import FormNumber from './FormNumber';
import FormPassword from './FormPassword';
import FormRootContext from './FormRootContext';
import FormSelect from './FormSelect';
import FormSubmit from './FormSubmit';
import FormText from './FormText';
import FormTextArea from './FormTextArea';

type Props = {
  +children: React.ChildrenArray<
    | React.Element<'div'> // allows additional styles inside `FormRoot`
    | React.Element<typeof FormEmail>
    | React.Element<typeof FormErrorMessages>
    | React.Element<typeof FormMultiSelect>
    | React.Element<typeof FormMultiUpload>
    | React.Element<typeof FormNumber>
    | React.Element<typeof FormPassword>
    | React.Element<typeof FormSelect>
    | React.Element<typeof FormSubmit>
    | React.Element<typeof FormText>
    | React.Element<typeof FormTextArea>,
  >,
};

export default function FormRoot(props: Props): React.Element<'form'> {
  const [contextState, setContextState] = React.useState({
    formFields: {},
    uploadables: {},
  });

  return (
    <form
      noValidate={true} // we use our custom validation
    >
      <FormRootContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          formFields: contextState.formFields,
          uploadables: contextState.uploadables,
          registerFormField: (
            inputName,
            inputValue,
            inputRef,
            validationError,
            validationErrorHidden,
          ) => {
            setContextState((prevState) => ({
              ...prevState,
              formFields: {
                ...prevState.formFields,
                [inputName]: {
                  inputName,
                  inputValue,
                  inputRef,
                  validationError,
                  validationErrorHidden,
                },
              },
            }));
          },
          updateFormField: (inputName, inputValue, validationError, validationErrorHidden) => {
            setContextState((prevState) => ({
              ...prevState,
              formFields: {
                ...prevState.formFields,
                [inputName]: {
                  ...prevState.formFields[inputName],
                  inputValue,
                  validationError,
                  validationErrorHidden,
                },
              },
            }));
          },
          unmaskFormFieldErrors: () => {
            setContextState((prevState) => {
              const formFields: { [empty]: any } = {};
              Object.keys(prevState.formFields).forEach((inputName) => {
                formFields[inputName] = {
                  ...prevState.formFields[inputName],
                  validationErrorHidden: false,
                };
              });
              return {
                ...prevState,
                formFields,
              };
            });
          },
          setUploadables: (uploadables) => {
            setContextState((prevState) => {
              return {
                ...prevState,
                uploadables,
              };
            });
          },
        }}
      >
        {props.children}
      </FormRootContext.Provider>
    </form>
  );
}
