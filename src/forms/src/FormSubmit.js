// @flow

import { useMutation, type GraphQLTaggedNode, type Variables } from '@adeira/relay';
import { fbs } from 'fbt';
import { type Node, useContext } from 'react';
import { Button, useFlashMessages, FlashMessageTint } from '@adeira/sx-design';

import FormRootContext from './FormRootContext';

type Props = {
  +children: FbtWithoutString,
  +mutation: GraphQLTaggedNode,
  +variables: ($FlowFixMe) => Variables,
  +onCompleted: (response: $FlowFixMe) => void,
};

/**
 * This is where all the form submit logic happens. The following steps are being performed:
 *
 * 1. we display all error messages if any (might be still hidden) and block the submission
 * 2. we collect all the values and convert them to mutation variables if everything is OK
 * 3. call the mutation
 */
export default function FormSubmit(props: Props): Node {
  const formRootContext = useContext(FormRootContext);
  const [displayFleshMessage] = useFlashMessages();

  // eslint-disable-next-line relay/generated-flow-types -- discovered when upgrading Relay Eslint plugin, FIXME
  const [runMutation, isMutationInProgress] = useMutation(props.mutation);

  const handleButtonClick = (event) => {
    event.preventDefault();

    formRootContext.unmaskFormFieldErrors();

    let hasErrors = false;
    const formValues = {};
    Object.keys(formRootContext.formFields).forEach((formFieldInputName) => {
      const { inputName, inputValue, validationError } =
        formRootContext.formFields[formFieldInputName];
      formValues[inputName] = inputValue;
      if (validationError != null) {
        hasErrors = true;
      }
    });

    if (hasErrors === true) {
      return;
    }

    // Convert form values to GraphQL mutation variables:
    const variables = props.variables(formValues);

    // Run the mutation:
    const mutationConfig = {
      uploadables: undefined,
      variables,
      onCompleted: props.onCompleted,
      onError: () => {
        displayFleshMessage(
          fbs(
            'Something unexpected happened and server could not process the request!',
            'generic failure message after submitting a form',
          ),
          { tint: FlashMessageTint.Error },
        );
      },
    };

    const uploadables = formRootContext.uploadables;
    if (uploadables != null) {
      mutationConfig.uploadables = uploadables;
    }

    runMutation(mutationConfig);
  };

  return (
    <Button type="submit" onClick={handleButtonClick} isDisabled={isMutationInProgress}>
      {props.children}
    </Button>
  );
}
