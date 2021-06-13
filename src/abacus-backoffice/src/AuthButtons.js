// @flow

import React, { useState, type Node } from 'react';
import GoogleLogin from 'react-google-login';
import { graphql, useMutation } from '@adeira/relay';
import { fbt } from 'fbt';
import sx from '@adeira/sx';

import constants from './constants';
import { useSessionTokenAPI } from './useSessionTokenAPI';
import type { AuthButtonsAuthorizeWebappMutation } from './__generated__/AuthButtonsAuthorizeWebappMutation.graphql';
import type { AuthButtonsDeauthorizeWebappMutation } from './__generated__/AuthButtonsDeauthorizeWebappMutation.graphql';

export function LoginButton(): Node {
  const { login } = useSessionTokenAPI();
  const [errorMessage, setErrorMessage] = useState(null);

  const [authorizeMutation] = useMutation<AuthButtonsAuthorizeWebappMutation>(graphql`
    mutation AuthButtonsAuthorizeWebappMutation($googleIdToken: String!) {
      authorizeWebapp(googleIdToken: $googleIdToken) {
        success
        sessionToken
        failureMessage
      }
    }
  `);

  const successResponseGoogle = (response) => {
    authorizeMutation({
      variables: {
        googleIdToken: response.tokenId,
      },
      onCompleted: ({ authorizeWebapp }) => {
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

  const failureResponseGoogle = (error) => {
    setErrorMessage(error.details);
  };

  return (
    <>
      <GoogleLogin
        clientId={constants.googleClientID}
        responseType="id_token"
        onSuccess={successResponseGoogle}
        onFailure={failureResponseGoogle}
      />
      {errorMessage != null ? <div className={styles('errorMessage')}>{errorMessage}</div> : null}
    </>
  );
}

export function LogoutButton(): Node {
  const { logout, sessionToken } = useSessionTokenAPI();

  const [deauthorizeMutation] = useMutation<AuthButtonsDeauthorizeWebappMutation>(graphql`
    mutation AuthButtonsDeauthorizeWebappMutation($sessionToken: String!) {
      deauthorize(sessionToken: $sessionToken) {
        __typename
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
            // TODO: we should logout from Google as well but `react-google-login` seems to be
            //       broken (https://github.com/anthonyjgrove/react-google-login/issues/130)
            logout();
          },
          onError: () => {
            logout();
          },
        });
      }}
    >
      <fbt desc="logout button title">Logout</fbt>
    </button>
  );
}

const styles = sx.create({
  errorMessage: {
    color: 'red',
  },
});
