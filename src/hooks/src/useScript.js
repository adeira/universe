// @flow strict

import { useEffect } from 'react';

export function useScript(url: string, onLoad: () => void): void {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.onload = onLoad;

    document.head?.appendChild(script);

    return () => {
      document.head?.removeChild(script);
    };
  }, [url, onLoad]);
}
