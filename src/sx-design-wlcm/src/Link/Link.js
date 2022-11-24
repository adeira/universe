// @flow

import NextLink from 'next/link';
import { Link as LinkHeadless } from '@adeira/sx-design-headless';
import sx from '@adeira/sx';
import type { Node, ElementConfig } from 'react';

type Props = $ReadOnly<{
  ...ElementConfig<typeof LinkHeadless>,
  +isActive?: boolean,
  +href:
    | string
    | {
        +pathname: string,
        +query: $FlowFixMe,
      },
  +as?: string,
  +locale?: string,

  // Why this property exists? Cannot we just use the `NextLink` directly here? Unfortunately, no.
  // There is one major bug in Next.js/Webpack that prevents this, see:
  //
  // - https://github.com/vercel/next.js/discussions/33605
  // - https://github.com/vercel/next.js/issues/22130#issuecomment-833610774
  // - https://github.com/vercel/next.js/discussions/34446
  //
  // Basically, it seems like webpack cannot transpile `process.env.__NEXT_I18N_SUPPORT` correctly
  // when the link comes from `node_modules` which makes the localized links work incorrectly.
  +nextLinkComponent: typeof NextLink,
}>;

/**
 * This component creates a normal `<a />` link with some reasonable default styles for
 * light and dark mode. It also sets `noreferrer` and `noopener` correctly for external links.
 *
 * Additionally, this component wraps the link with a Next.js `Link` component which is a
 * common pattern in Next.js applications using SX Design.
 *
 * See: https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
 */
export default function Link({
  href,
  as,
  locale,
  nextLinkComponent: NextLinkComponent,
  ...props
}: Props): Node {
  return (
    <NextLinkComponent
      href={href}
      passHref={true}
      legacyBehavior={true} // TODO: migrate to the modern behavior
      as={as}
      locale={locale}
    >
      {/* $FlowExpectedError[prop-missing]: `href` should be provided automatically thanks to `passHref` */}
      <LinkHeadless
        data-testid={props['data-testid']}
        target={props.target}
        className={sx(styles.default, props.isActive ? styles.active : styles.inactive)}
        onClick={props.onClick}
      >
        {props.children}
      </LinkHeadless>
    </NextLinkComponent>
  );
}

const styles = sx.create({
  default: {
    'color': 'var(--wlcm-primary)',
    'cursor': 'pointer',
    'textDecorationColor': 'transparent',
    'textDecorationLine': 'underline',
    'textDecorationStyle': 'solid',
    'textDecorationThickness': '.05em',
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
