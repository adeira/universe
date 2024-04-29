// @flow

import Icon from '@adeira/icons';
import React, { useState, type Node } from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { graphql, useMutation } from '@adeira/relay';
import { Loader } from '@adeira/sx-design';
import { useSessionTokenAPI } from '@adeira/hooks';

import constants from './constants';
import GoogleLoginButton from './GoogleLoginButton';

export function LoginButton(): Node {
  const { login } = useSessionTokenAPI();
  const [errorMessage, setErrorMessage] = useState<?string | Fbt>(null);

  const [authorizeMutation, isAuthorizeMutationPending] = useMutation(graphql`
    mutation AuthButtonsAuthorizeWebappMutation($googleIdToken: String!) {
      auth {
        authorizeWebapp(googleIdToken: $googleIdToken) {
          success
          sessionToken
          failureMessage
        }
      }
    }
  `);

  const successResponseGoogle = (googleIdToken: string) => {
    authorizeMutation({
      variables: { googleIdToken },
      onCompleted: ({ auth: { authorizeWebapp } }) => {
        const sessionToken = authorizeWebapp.sessionToken;
        if (authorizeWebapp.success === true && sessionToken != null) {
          setErrorMessage(null);
          login(sessionToken);
        } else {
          setErrorMessage(authorizeWebapp.failureMessage);
        }
      },
      onError: () => {
        setErrorMessage(fbt('Some unknown error happened', 'login unknown error'));
      },
    });
  };

  return (
    <>
      <GoogleLoginButton
        clientID={constants.googleClientID}
        onGoogleSignIn={successResponseGoogle}
      />
      {isAuthorizeMutationPending === true ? <Loader /> : null}
      {errorMessage != null ? <div className={styles('errorMessage')}>{errorMessage}</div> : null}
    </>
  );
}

export function LogoutButton(): Node {
  const { logout, sessionToken } = useSessionTokenAPI();

  const [deauthorizeMutation] = useMutation(graphql`
    mutation AuthButtonsDeauthorizeWebappMutation($sessionToken: String!) {
      auth {
        deauthorize(sessionToken: $sessionToken) {
          __typename
        }
      }
    }
  `);

  return (
    <button
      type="button"
      onClick={() => {
        if (sessionToken == null) {
          logout();
          return;
        }

        deauthorizeMutation({
          variables: { sessionToken },
          onCompleted: () => {
            // TODO: call `google.accounts.id.disableAutoSelect()`
            //  See: https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.disableAutoSelect
            logout();
          },
          onError: () => {
            logout();
          },
        });
      }}
    >
      <Icon name="enter" /> <fbt desc="logout button title">Logout</fbt>
    </button>
  );
}

const styles = sx.create({
  errorMessage: {
    color: 'rgba(var(--sx-error))',
  },
});
