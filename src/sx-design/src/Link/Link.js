// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {
  +'href': string,
  +'children': React.Node,
  +'target'?: string,
  +'isActive'?: boolean,
  +'xstyle'?: AllCSSProperties,
  +'data-testid'?: string,
  +'onClick'?: () => void,
};

/**
 * This component tries to create a normal `<a />` link with some reasonable default styles for
 * light and dark mode. It also sets `noreferrer` and `noopener` correctly for external links.
 *
 * Optionally, you can use [React refs](https://reactjs.org/docs/refs-and-the-dom.html) and it will
 * be forwarded to the HTML `<a />` element as expected.
 *
 * ## CSS variables
 *
 * `--sx-link-text-color` (overwrites default link color)
 */
export default (React.forwardRef(function Link(props, ref) {
  const href = props.href;
  const isExternalLink = /^https?:\/\//.test(href);
  return (
    // eslint-disable-next-line react/forbid-elements
    <a
      ref={ref}
      href={href}
      data-testid={props['data-testid']}
      {...((isExternalLink || props.target === '_blank') && { rel: 'noreferrer noopener' })}
      target={props.target}
      className={sx(styles.default, props.isActive ? styles.active : styles.inactive, props.xstyle)}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
}): React.AbstractComponent<Props, HTMLAnchorElement>);

const styles = sx.create({
  default: {
    'color': 'rgba(var(--sx-link-text-color))',
    'cursor': 'pointer',
    'textDecorationColor': 'transparent',
    'textDecorationLine': 'underline',
    'textDecorationStyle': 'solid',
    'textDecorationThickness': '.05em',
    '@media (prefers-reduced-motion: no-preference)': {
      transition: 'text-decoration-color 300ms',
    },
    ':hover': {
      opacity: 1,
      textDecorationColor: 'inherit',
    },
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.9,
  },
});
