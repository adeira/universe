// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { isMacOs } from 'react-device-detect';

const keyMap = {
  ALT: ((isMacOs ? 'Option ⌥' : 'Alt'): string),
  CTRL: ((isMacOs ? 'Command ⌘' : 'Ctrl'): string),
  SHIFT: 'Shift',
};

type Props = {
  +code: $Keys<typeof keyMap>,
};

/**
 * This component provides KBD element rendering single keyboard key. It tries to render the correct
 * key based on the client operating system, see:
 *
 * - Keyboard mappings using a PC keyboard on a Macintosh: https://support.microsoft.com/en-us/topic/keyboard-mappings-using-a-pc-keyboard-on-a-macintosh-d4fd87ca-8762-30ee-fcde-08ffe95faea3
 * - Windows keys on a Mac keyboard: https://support.apple.com/guide/mac-help/windows-keys-on-a-mac-keyboard-cpmh0152/mac
 *
 * ## CSS variables
 *
 * `--sx-kbd-border` (overwrites the default border)
 */
export default function Kbd(props: Props): Node {
  // eslint-disable-next-line react/forbid-elements
  return <kbd className={styles('kbd')}>{keyMap[props.code]}</kbd>;
}

const styles = sx.create({
  kbd: {
    borderRadius: 'var(--sx-radius)',
    border: 'var(--sx-kbd-border, 1px solid #b4b4b4)',
    color: 'rgba(var(--sx-foreground))',
    display: 'inline-block',
    fontSize: '0.85em',
    fontWeight: '700',
    lineHeight: 1,
    padding: '2px 4px',
    whiteSpace: 'nowrap',
  },
});
