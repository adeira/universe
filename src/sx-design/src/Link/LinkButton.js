// @flow

import Icon from '@adeira/icons';
import NextLink from 'next/link';
import React, { type Node } from 'react';
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

  // Why this property exists? Cannot we just use the `NextLink` directly here? Unfortunately, no.
  // There is one major bug in Next.js/Webpack that prevents this, see:
  //
  // - https://github.com/vercel/next.js/discussions/33605
  // - https://github.com/vercel/next.js/issues/22130#issuecomment-833610774
  // - https://github.com/vercel/next.js/discussions/34446
  //
  // Basically, it seems like webpack cannot transpile `process.env.__NEXT_I18N_SUPPORT` correctly
  // when the link comes from `node_modules` which makes the localized links work incorrectly.
  +'nextLinkComponent': typeof NextLink,
};

/**
 * Stylistically similar to <Button /> except it renders a link and expects `href` instead of
 * `onClick` property.
 *
 * ## Accessibility
 *
 * Disabled `LinkButton` is focusable so people with visual impairment can get oriented on the page,
 * however, the `onClick` callback and link navigation are disabled.
 */
export default function LinkButton(props: Props): Node {
  const handleOnClick = (event) => {
    if (props.isDisabled !== true) {
      props.onClick?.(event);
    } else {
      event.preventDefault();
    }
  };

  return (
    <Link
      href={props.href}
      target={props.target}
      isActive={props.isActive ?? true}
      data-testid={props['data-testid']}
      xstyle={styles.linkStylesReset}
      onClick={handleOnClick}
      nextLinkComponent={props.nextLinkComponent}
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
}

const styles = sx.create({
  linkStylesReset: {
    ':hover': {
      textDecoration: 'none',
    },
  },
});
