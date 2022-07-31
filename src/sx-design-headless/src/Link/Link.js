// @flow

import * as React from 'react';

export type Props = {
  +'href': string,
  +'children': React.Node,
  +'target'?: string,
  +'data-testid'?: string,
  +'onClick'?: (event: SyntheticEvent<HTMLAnchorElement>) => void,
};

/**
 * This component creates a normal `<a />` link while correctly setting `noreferrer` and `noopener`
 * for external links.
 *
 * Optionally, you can use [React refs](https://reactjs.org/docs/refs-and-the-dom.html) and it will
 * be forwarded to the HTML `<a />` element as expected.
 */
export default (React.forwardRef(function Link(props, ref) {
  const href = props.href;
  const isExternalLink = /^https?:\/\//.test(href);
  return (
    <a
      ref={ref}
      href={href}
      data-testid={props['data-testid']}
      {...((isExternalLink || props.target === '_blank') && { rel: 'noreferrer noopener' })}
      target={props.target}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
}): React.AbstractComponent<
  $ReadOnly<{
    ...Props,
    +className: ?string,
  }>,
  HTMLAnchorElement,
>);
