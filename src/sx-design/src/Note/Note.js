// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Button from '../Button/Button';

type Props = {
  +children: React.Node,
  +tint?: 'default' | 'success' | 'error' | 'warning',
  // The `action` can either be an HTML `button` element or our component `Button` from SX Design.
  // In such case, the `tint` will be automatically propagated to the `Button`.
  +action?: ?(React.Element<'button'> | React.Element<typeof Button>),
};

export default function Note(props: Props): React.Node {
  const { action: ActionButton, tint, children } = props;

  const isButtonComponent =
    React.isValidElement(ActionButton) &&
    ActionButton != null &&
    // $FlowFixMe[prop-missing]: due to a poor design, we need to access Element internals (type)
    ActionButton.type === Button;

  return (
    <span
      className={styles({
        noteBase: true,
        noteSuccess: tint === 'success',
        noteError: tint === 'error',
        noteWarning: tint === 'warning',
      })}
    >
      <div>{children}</div>
      {ActionButton != null ? (
        <div>
          {isButtonComponent ? (
            <Button
              // $FlowFixMe[prop-missing]: due to a poor design, we need to access Element internals (props)
              {...ActionButton.props} // preserve props set by the user
              tint={tint} // and overwrite the tint
            />
          ) : (
            ActionButton
          )}
        </div>
      ) : null}
    </span>
  );
}

const styles = sx.create({
  noteBase: {
    border: '1px solid rgba(var(--sx-accent-2))',
    color: 'rgba(var(--sx-foreground))',
    padding: '7px 12px',
    borderRadius: 'var(--sx-radius)',
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
