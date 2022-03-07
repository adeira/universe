// @flow

import sx from '@adeira/sx';

export default (sx.create({
  buttonBase: {
    display: 'inline-block',
    borderRadius: 'var(--sx-radius)',
    cursor: 'pointer',
    userSelect: 'none',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
    font: 'inherit',
  },
  buttonSmall: {
    paddingBlock: '0.4rem',
    paddingInline: 'var(--sx-spacing-small)',
  },
  buttonMedium: {
    paddingBlock: 'var(--sx-spacing-small)',
    paddingInline: 'var(--sx-spacing-medium)',
  },
  buttonLarge: {
    paddingBlock: 'var(--sx-spacing-medium)',
    paddingInline: 'var(--sx-spacing-medium)',
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
    'backgroundColor': 'rgba(var(--sx-foreground))',
    'color': 'rgba(var(--sx-background))',
    'border': '1px solid rgba(var(--sx-foreground))',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-background))',
      color: 'rgba(var(--sx-foreground))',
      border: '1px solid rgba(var(--sx-foreground))',
    },
  },
  buttonTintSecondary: {
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
  buttonTintTransparent: {
    'color': 'rgba(var(--sx-background))',
    'backgroundColor': 'rgba(var(--sx-background), 0.1)',
    'border': '1px solid rgba(var(--sx-background), 0.2)',
    ':hover': {
      backgroundColor: 'rgba(var(--sx-background), 0.2)',
      border: '1px solid rgba(var(--sx-background), 0.4)',
    },
  },
}): $FlowFixMe);
