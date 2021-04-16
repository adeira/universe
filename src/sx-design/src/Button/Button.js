// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: FbtWithoutString,
  +onClick: () => void,
  +tint?: 'default' | 'error' | 'success' | 'warning',
  +isDisabled?: boolean,
};

export default function Button(props: Props): React.Element<'button'> {
  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.isDisabled === true}
      className={styles({
        buttonBase: true,
        buttonTintDefault: props.tint == null || props.tint === 'default',
        buttonTintError: props.tint === 'error',
        buttonTintSuccess: props.tint === 'success',
        buttonTintWarning: props.tint === 'warning',
        buttonDisabled: props.isDisabled === true,
      })}
    >
      {props.children}
    </button>
  );
}

const styles = sx.create({
  buttonBase: {
    padding: '10px 15px',
    borderRadius: 5,
    cursor: 'pointer',
    userSelect: 'none',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
  },
  buttonDisabled: {
    'backgroundColor': 'rgba(var(--sx-foreground), 0.1)',
    'border': '1px solid rgba(var(--sx-accent-2))',
    'color': 'rgba(var(--sx-foreground), 0.5)',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-foreground), 0.1)',
      border: '1px solid rgba(var(--sx-accent-2))',
      color: 'rgba(var(--sx-foreground), 0.5)',
      cursor: 'not-allowed',
    },
  },
  buttonTintDefault: {
    'backgroundColor': 'rgba(var(--sx-background))',
    'color': 'rgba(var(--sx-foreground))',
    'border': '1px solid rgba(var(--sx-accent-2))',
    ':hover': {
      border: '1px solid rgba(var(--sx-foreground))',
    },
  },
  buttonTintError: {
    'backgroundColor': 'rgba(var(--sx-error))',
    'color': 'rgba(var(--sx-background))',
    'border': '1px solid rgba(var(--sx-error))',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-background))',
      color: 'rgba(var(--sx-error))',
    },
  },
  buttonTintSuccess: {
    'backgroundColor': 'rgba(var(--sx-success))',
    'color': 'rgba(var(--sx-background))',
    'border': '1px solid rgba(var(--sx-success))',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-background))',
      color: 'rgba(var(--sx-success))',
    },
  },
  buttonTintWarning: {
    'backgroundColor': 'rgba(var(--sx-warning))',
    'color': 'rgba(var(--sx-background))',
    'border': '1px solid rgba(var(--sx-warning))',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-background))',
      color: 'rgba(var(--sx-warning))',
    },
  },
});
