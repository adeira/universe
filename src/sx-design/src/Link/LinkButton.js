// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Link from './Link';
import sharedButtonStyles from '../Button/styles';

type Props = {
  +'href': string,
  +'children': FbtWithoutString,
  +'target'?: string,
  +'isActive'?: boolean,
  +'tint'?: 'default' | 'error' | 'success' | 'warning',
  +'isDisabled'?: boolean,
  +'data-testid'?: string,
  +'onClick'?: () => void,
};

/**
 * Stylistically similar to <Button /> except it renders a link and expects `href` instead of
 * `onClick` property.
 *
 * Optionally, you can use [React refs](https://reactjs.org/docs/refs-and-the-dom.html) and it will
 * be forwarded to the HTML `<a />` element as expected.
 */
export default (React.forwardRef(function LinkButton(props, ref): React.Node {
  return (
    <Link
      ref={ref}
      href={props.href}
      target={props.target}
      isActive={props.isActive ?? true}
      data-testid={props['data-testid']}
      xstyle={styles.linkStylesReset}
      onClick={props.onClick}
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
}): React.AbstractComponent<Props, HTMLAnchorElement>);

const styles = sx.create({
  linkStylesReset: {
    ':hover': {
      textDecoration: 'none',
    },
  },
});
