// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Link from '../Link/Link';
import sharedButtonStyles from './styles';

type Props = {
  +'href': string,
  +'children': FbtWithoutString,
  +'target'?: string,
  +'isActive'?: boolean,
  +'tint'?: 'default' | 'error' | 'success' | 'warning',
  +'isDisabled'?: boolean,
  +'data-testid'?: string,
};

/**
 * Stylistically similar to <Button /> except it renders a link and expects `href` instead of
 * `onClick` property.
 */
export default function ButtonLink(props: Props): React.Node {
  return (
    <Link
      href={props.href}
      target={props.target}
      isActive={props.isActive ?? true}
      data-testid={props['data-testid']}
      xstyle={styles.linkStylesReset}
    >
      <span
        className={sharedButtonStyles({
          buttonBase: true,
          buttonTintDefault: props.tint == null || props.tint === 'default',
          buttonTintError: props.tint === 'error',
          buttonTintSuccess: props.tint === 'success',
          buttonTintWarning: props.tint === 'warning',
          buttonDisabled: props.isDisabled === true,
        })}
      >
        {props.children}
      </span>
    </Link>
  );
}

const styles = sx.create({
  linkStylesReset: {
    ':hover': {
      textDecoration: 'none',
    },
  },
});
