// @flow strict

import { useEffect, useState } from 'react';

export default function useKeyPress({
  key,
  onKeyDown,
}: {
  +key:  // https://keycode.info/
    | 'Alt'
    | 'ArrowDown'
    | 'ArrowLeft'
    | 'ArrowRight'
    | 'ArrowUp'
    | 'Backspace'
    | 'CapsLock'
    | 'Control'
    | 'Enter'
    | 'Escape'
    | 'Meta'
    | 'Shift'
    | 'Tab',
  +onKeyDown: () => void,
}): boolean {
  const [isPressed, setPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key: pressedKey } = event;
      if (key === pressedKey) {
        if (onKeyDown) {
          onKeyDown();
        }
        setPressed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, onKeyDown]);

  return isPressed;
}
