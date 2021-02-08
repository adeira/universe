// @flow strict

/* global window */

import { useState } from 'react';

/**
 * This essentially behaves like `useState` from React except it additionally persist the values
 * into session storage. Usage:
 *
 * ```
 * const [storedValue, setStoredValue] = useSessionStorage(
 * 		'storedValueKey',
 * 		'initialStoredValue' ?? null,
 * );
 * ```
 *
 * Please note: it currently doesn't react the session storage value every time (only on first load).
 */
export function useSessionStorage<S>(key: string, initialValue: S): [S, (S) => void] {
  const prefixedKey = `ycbo:${key}`;

  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const item = window.sessionStorage.getItem(prefixedKey);
      return JSON.parse(item);
    } catch (e) {
      return initialValue;
    }
  });

  const setValue = (value: S) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch (e) {
      // nevermind
    }
  };

  return [storedValue, setValue];
}
