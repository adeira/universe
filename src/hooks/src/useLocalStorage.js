// @flow strict

import { useState } from 'react';

/**
 * This essentially behaves like `useState` from React except it additionally persist the values
 * into local storage. Usage:
 *
 * ```
 * const [storedValue, setStoredValue] = useLocalStorage(
 * 		'storedValueKey',
 * 		'initialStoredValue' ?? null,
 * );
 * ```
 *
 * @see https://usehooks.com/useLocalStorage/
 */
export function useLocalStorage<S>(key: string, initialValue: S): [S, (S) => void] {
  // TODO: make this prefixed key universal for any application
  const prefixedKey = `mx.com.kochka:${key}`;

  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: S) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch {
      // nevermind
    }
  };

  return [storedValue, setValue];
}
