// @flow strict

import { useSessionStorage } from './useSessionStorage';

/* global window */

type UseSessionTokenAPI = {
  +login: (string | null) => void,
  +logout: () => void,
  +sessionToken: string | null,
};

export function useSessionTokenAPI(): UseSessionTokenAPI {
  // https://stackoverflow.com/a/40376819/3135248
  const [sessionToken, setSessionToken] = useSessionStorage('ssntkn', null);

  return {
    login: (newWessionToken) => {
      setSessionToken(newWessionToken);
      window.location.reload();
    },
    logout: () => {
      setSessionToken(null);
      window.location.reload();
    },
    sessionToken,
  };
}
