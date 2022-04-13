// @flow strict

import { useState, useEffect, useRef } from 'react';

/**
 * Usage:
 *
 * ```
 * function MyComponent() {
 *   const ref = useRef();
 *   const isIntersecting = useIntersectionObserver(ref);
 *
 *   if (isIntersecting === true) {
 *     console.log('The element is visible!');
 *   } else {
 *     console.log('The element is NOT visible!');
 *   }
 *
 *   return <footer ref={ref}> … </footer>
 * }
 * ```
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export function useIntersectionObserver(domRef: ReactRefObject<?HTMLElement>): boolean {
  const observerRef: ReactRefObject<IntersectionObserver | void> = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    if (domRef.current != null) {
      observerRef.current?.observe(domRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [domRef]);

  return isIntersecting;
}
