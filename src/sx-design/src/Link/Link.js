// @flow

import * as React from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {
  +href: string,
  +children: React.Node,
  +target?: string,
  +isActive?: boolean,
  +xstyle?: AllCSSProperties,
};

/**
 * This component tries to create a normal `<a />` link with some reasonable default styles for
 * light and dark mode. It also sets `noreferrer` and `noopener` correctly for external links.
 */
export default function Link(props: Props): React.Node {
  const href = props.href;
  const isExternalLink = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...((isExternalLink || props.target === '_blank') && { rel: 'noreferrer noopener' })}
      target={props.target}
      className={sx(styles.default, props.isActive ? null : styles.inactive, props.xstyle)}
    >
      {props.children}
    </a>
  );
}

const styles = sx.create({
  default: {
    'color': 'rgba(var(--sx-text-link-color))',
    'cursor': 'pointer',
    'textDecoration': 'none',
    ':hover': {
      opacity: 1,
      textDecoration: 'underline',
    },
  },
  inactive: {
    opacity: 0.85,
  },
});
