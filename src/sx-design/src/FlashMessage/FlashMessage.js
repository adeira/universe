// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +message: FbtWithoutString,
};

/**
 * `FlashMessage` component should not be used directly. Instead, use `useFlashMessages` hook to
 * trigger the "flash message" from anywhere in the application (for example after getting GraphQL
 * mutation response).
 *
 * TODO: add support for multiple flash messages at the same time
 */
export default function FlashMessage(props: Props): Node {
  return (
    <div
      className={styles({
        wrapper: true,
        tintSuccess: true, // TODO: make this changeable from the outside via props
      })}
    >
      {props.message}
      <div className={styles('progress')} />
    </div>
  );
}

const bgTest = sx.keyframes({
  '0%': { width: '100%' },
  '100%': { width: 0, display: 'none' },
});

const styles = sx.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: 'var(--sx-shadow-large)',
    paddingInline: 20,
    paddingBlockStart: 15,
    borderRadius: 'var(--sx-radius)',
    marginBlockEnd: 20,
    marginInlineEnd: 20,
    minWidth: 250,
    maxWidth: 300,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    height: 3,
    backgroundColor: 'rgba(var(--sx-success-lighter))',
    marginBlockStart: 15,
    animationName: bgTest,
    animationDuration: '2500ms', // aligned with the message timeout (!)
    animationFillMode: 'forwards',
    animationTimingFunction: 'linear',
  },
  tintSuccess: {
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-success))',
  },
});
