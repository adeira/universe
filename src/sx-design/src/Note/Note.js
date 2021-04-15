// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';

type Props = {
  +children: React.Node,
  +tint?: 'default' | 'success' | 'error' | 'warning',
  +action?: RestrictedElement<'button'>,
};

export default function Note(props: Props): React.Node {
  const notePrefixes = {
    success: <fbt desc="success note prefix">Success</fbt>,
    error: <fbt desc="error note prefix">Error</fbt>,
    warning: <fbt desc="warning note prefix">Warning</fbt>,
    default: <fbt desc="default note prefix">Note</fbt>,
  };

  return (
    <span
      className={styles({
        noteBase: true,
        noteSuccess: props.tint === 'success',
        noteError: props.tint === 'error',
        noteWarning: props.tint === 'warning',
      })}
    >
      <div>
        <strong>{notePrefixes[props.tint ?? 'default']}:</strong> {props.children}
      </div>
      <div>{props.action}</div>
    </span>
  );
}

const styles = sx.create({
  noteBase: {
    border: '1px solid rgba(var(--sx-accent-2))',
    color: 'rgba(var(--sx-foreground))',
    padding: '7px 12px',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteSuccess: {
    border: '1px solid rgba(var(--sx-success))',
    color: 'rgba(var(--sx-success))',
  },
  noteError: {
    border: '1px solid rgba(var(--sx-error))',
    color: 'rgba(var(--sx-error))',
  },
  noteWarning: {
    border: '1px solid rgba(var(--sx-warning))',
    color: 'rgba(var(--sx-warning))',
  },
});
