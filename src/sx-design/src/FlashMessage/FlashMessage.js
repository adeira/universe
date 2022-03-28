// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

export enum FlashMessageTint of string {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

type Props = {
  +message: Fbt,
  +tint: FlashMessageTint,
};

/**
 * `FlashMessage` component should not be used directly. Instead, use `useFlashMessages` hook to
 * trigger the "flash message" from anywhere in the application (for example after getting GraphQL
 * mutation response).
 *
 * TODO: add support for multiple flash messages at the same time
 */
export default function FlashMessage(props: Props): Node {
  const hasDefaultTint = props.tint === FlashMessageTint.Default;
  const hasErrorTint = props.tint === FlashMessageTint.Error;
  const hasSuccessTint = props.tint === FlashMessageTint.Success;
  const hasWarningTint = props.tint === FlashMessageTint.Warning;

  return (
    <div
      className={styles({
        wrapper: true,
        tintDefault: hasDefaultTint,
        tintError: hasErrorTint,
        tintSuccess: hasSuccessTint,
        tintWarning: hasWarningTint,
      })}
    >
      {props.message}
      <div
        className={styles({
          progress: true,
          progressDefault: hasDefaultTint,
          progressError: hasErrorTint,
          progressSuccess: hasSuccessTint,
          progressWarning: hasWarningTint,
        })}
      />
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
    marginBlockStart: 15,
    animationName: bgTest,
    animationDuration: '2500ms', // aligned with the message timeout (!)
    animationFillMode: 'forwards',
    animationTimingFunction: 'linear',
  },
  progressDefault: {
    backgroundColor: 'rgba(var(--sx-accent-1))',
  },
  progressError: {
    backgroundColor: 'rgba(var(--sx-error-lighter))',
  },
  progressSuccess: {
    backgroundColor: 'rgba(var(--sx-success-lighter))',
  },
  progressWarning: {
    backgroundColor: 'rgba(var(--sx-warning-lighter))',
  },
  tintDefault: {
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-foreground))',
  },
  tintError: {
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-error))',
  },
  tintSuccess: {
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-success))',
  },
  tintWarning: {
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-warning))',
  },
});
