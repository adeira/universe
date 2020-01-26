// @flow strict

import { useEffect, useRef } from 'react';

export default function useIsMountedRef(): { +current: boolean } {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}
