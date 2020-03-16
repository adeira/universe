// @flow strict

import { useEffect, useRef } from 'react';

export default function useIsMountedRef(): {| +current: boolean |} {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}
