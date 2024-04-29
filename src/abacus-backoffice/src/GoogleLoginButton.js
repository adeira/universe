// @flow strict

import { useRef, type Node } from 'react';
import { useScript } from '@adeira/hooks';

type Props = {
  +clientID: string,
  +onGoogleSignIn: (credential: string) => void,
};

/**
 * See: https://developers.google.com/identity/gsi/web
 *
 * JavaScript reference: https://developers.google.com/identity/gsi/web/reference/js-reference
 */
export default function GoogleLoginButton(props: Props): Node {
  const googleSignInButton = useRef<HTMLDivElement | null>(null);

  const onGoogleSignIn = ({ credential }: { +credential: string }) => {
    // https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
    props.onGoogleSignIn(credential);
  };

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: props.clientID,
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      type: 'standard',
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangular',
      text: 'continue_with',
      ux_mode: 'popup',
      // TODO: locale
    });
  });

  return <div ref={googleSignInButton} />;
}
