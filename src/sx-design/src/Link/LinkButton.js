// @flow

import Icon from '@adeira/icons';
import React, { type AbstractComponent, type Node } from 'react';
import sx from '@adeira/sx';

import Link from './Link';
import sharedButtonStyles from '../Button/styles';
import Money from '../Money/Money';

type Props = {
  +'href': string,
  +'children': FbtWithoutString | RestrictedElement<typeof Money>,
  +'target'?: string,
  +'isActive'?: boolean,
  +'tint'?: 'default' | 'secondary' | 'error' | 'success' | 'warning',
  +'size'?: 'small' | 'medium' | 'large',
  +'isDisabled'?: boolean,
  +'data-testid'?: string,
  +'onClick'?: (event: SyntheticEvent<HTMLAnchorElement>) => void,
  +'prefix'?: RestrictedElement<typeof Icon>,
  +'suffix'?: RestrictedElement<typeof Icon>,
};

/**
 * Stylistically similar to <Button /> except it renders a link and expects `href` instead of
 * `onClick` property.
 *
 * Optionally, you can use [React refs](https://reactjs.org/docs/refs-and-the-dom.html) and it will
 * be forwarded to the HTML `<a />` element as expected.
 *
 * ## Accessibility
 *
 * Disabled `LinkButton` is focusable so people with visual impairment can get oriented on the page,
 * however, the `onClick` callback and link navigation are disabled.
 */
export default (React.forwardRef(function LinkButton(props, ref): Node {
  const handleOnClick = (event) => {
    if (props.isDisabled !== true) {
      props.onClick?.(event);
    } else {
      event.preventDefault();
    }
  };

  return (
    <Link
      ref={ref}
      href={props.href}
      target={props.target}
      isActive={props.isActive ?? true}
      data-testid={props['data-testid']}
      xstyle={styles.linkStylesReset}
      onClick={handleOnClick}
    >
      <span
        className={sharedButtonStyles({
          buttonBase: true,
          buttonSmall: props.size === 'small',
          buttonMedium: props.size == null || props.size === 'medium',
          buttonLarge: props.size === 'large',
          buttonTintDefault: props.tint == null || props.tint === 'default',
          buttonTintSecondary: props.tint === 'secondary',
          buttonTintError: props.tint === 'error',
          buttonTintSuccess: props.tint === 'success',
          buttonTintWarning: props.tint === 'warning',
          buttonDisabled: props.isDisabled === true,
        })}
      >
        {props.prefix != null ? <>{props.prefix} </> : null}
        {props.children}
        {props.suffix != null ? <> {props.suffix}</> : null}
      </span>
    </Link>
  );
}): AbstractComponent<Props, HTMLAnchorElement>);

const styles = sx.create({
  linkStylesReset: {
    ':hover': {
      textDecoration: 'none',
    },
  },
});
