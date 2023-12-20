// @flow

import { Link as LinkHeadless } from '@adeira/sx-design-headless';
import sx, { type AllCSSProperties } from '@adeira/sx';
import type { Node, ElementConfig, ElementType } from 'react';

import { MediaQueryMotion } from '../MediaQueries';

type Props = $ReadOnly<{
  ...ElementConfig<typeof LinkHeadless>,
  +isActive?: boolean,
  +xstyle?: AllCSSProperties,
  +href:
    | string
    | {
        +pathname: string,
        +query: $FlowFixMe,
      },
  +asPath?: string,
  +locale?: string,
  +as?: ElementType,
}>;

/**
 * This component creates a normal `<a />` link with some reasonable default styles for
 * light and dark mode. It also sets `noreferrer` and `noopener` correctly for external links.
 *
 * Optionally, you can use [React refs](https://reactjs.org/docs/refs-and-the-dom.html) and it will
 * be forwarded to the HTML `<a />` element as expected.
 *
 * ## CSS variables
 *
 * `--sx-link-text-color` (overwrites default link color)
 */
export default function Link({
  href,
  asPath,
  locale,
  as: LinkComponent = 'a',
  ...props
}: Props): Node {
  if (LinkComponent === 'a') {
    return (
      <LinkHeadless
        // $FlowFixMe[incompatible-type]: TODO: decouple from Next.js
        href={href}
        data-testid={props['data-testid']}
        target={props.target}
        className={sx(
          styles.default,
          props.isActive ? styles.active : styles.inactive,
          props.xstyle,
        )}
        onClick={props.onClick}
      >
        {props.children}
      </LinkHeadless>
    );
  }

  return (
    // $FlowFixMe[incompatible-type]: TODO: decouple from Next.js
    <LinkComponent
      href={href}
      passHref={true}
      legacyBehavior={true} // TODO: migrate to the modern behavior
      as={asPath}
      locale={locale}
    >
      {/* $FlowExpectedError[prop-missing]: `href` should be provided automatically thanks to `passHref` */}
      <LinkHeadless
        data-testid={props['data-testid']}
        target={props.target}
        className={sx(
          styles.default,
          props.isActive ? styles.active : styles.inactive,
          props.xstyle,
        )}
        onClick={props.onClick}
      >
        {props.children}
      </LinkHeadless>
    </LinkComponent>
  );
}

const styles = sx.create({
  default: {
    'color': 'rgba(var(--sx-link-text-color))',
    'cursor': 'pointer',
    'textDecorationColor': 'transparent',
    'textDecorationLine': 'underline',
    'textDecorationStyle': 'solid',
    'textDecorationThickness': '.05em',
    [MediaQueryMotion.NO_PREFERENCE]: {
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
