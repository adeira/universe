// @flow strict

/* global document,window */

type UseSessionTokenAPI = {
  +login: (string | null) => void,
  +logout: () => void,
  +sessionToken: string | null,
};

const SESSION_IDENTIFIER = 'ABACUS_SESSION_TOKEN=';

// The following hook stores session token in JavaScript accessible (client-side) cookie. The cookie
// itself is not used in any way on the server (instead, it should be relayed to the `Authorization`
// header). See option 3 here: https://stackoverflow.com/a/40376819/3135248
//
// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// See: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export function useSessionTokenAPI(): UseSessionTokenAPI {
  const setSessionToken = (sessionToken) => {
    try {
      const cookieValue = `${SESSION_IDENTIFIER}${encodeURIComponent(sessionToken ?? '')}`;
      const cookieAttributes = [
        `SameSite=strict`,
        // TODO: store as "secure" cookie (once we are 100% HTTPS)
      ];

      if (sessionToken == null) {
        // logout by making the cookie expired
        cookieAttributes.push('expires=Thu, 01 Jan 1970 00:00:00 GMT');
      }

      document.cookie = `${cookieValue};${cookieAttributes.join(';')}`;
    } catch {
      // nevermind
    }
  };

  let sessionToken;
  try {
    const rawSessionToken =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(SESSION_IDENTIFIER))
        ?.split('=')[1] ?? null;
    sessionToken = rawSessionToken == null ? null : decodeURIComponent(rawSessionToken);
  } catch {
    sessionToken = null;
  }

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
