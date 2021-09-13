// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: FbtWithoutString,
  +tint?: 'default' | 'error' | 'success' | 'warning',
};

export default function Badge(props: Props): React.Node {
  const { tint } = props;

  return (
    <span
      className={styles({
        badgeBase: true,
        badgeTintDefault: tint == null || tint === 'default',
        badgeTintError: tint === 'error',
        badgeTintSuccess: tint === 'success',
        badgeTintWarning: tint === 'warning',
      })}
    >
      {props.children}
    </span>
  );
}

const styles = sx.create({
  badgeBase: {
    padding: '2px 7px',
    borderRadius: 'var(--sx-radius)',
    lineHeight: 1,
    fontSize: 'smaller',
  },
  badgeTintDefault: {
    backgroundColor: 'rgba(var(--sx-foreground), 0.1)',
    color: 'rgba(var(--sx-foreground))',
    border: '1px solid rgba(var(--sx-foreground), 0.3)',
  },
  badgeTintError: {
    backgroundColor: 'rgba(var(--sx-error-dark), 0.1)',
    color: 'rgba(var(--sx-error-dark))',
    border: '1px solid rgba(var(--sx-error-dark), 0.3)',
  },
  badgeTintSuccess: {
    backgroundColor: 'rgba(var(--sx-success-dark), 0.1)',
    color: 'rgba(var(--sx-success-dark))',
    border: '1px solid rgba(var(--sx-success-dark), 0.3)',
  },
  badgeTintWarning: {
    backgroundColor: 'rgba(var(--sx-warning-dark), 0.1)',
    color: 'rgba(var(--sx-warning-dark))',
    border: '1px solid rgba(var(--sx-warning-dark), 0.3)',
  },
});
