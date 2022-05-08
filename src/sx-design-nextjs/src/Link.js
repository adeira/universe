// @flow

import NextLink from 'next/link';
import { Link as SxDesignLink } from '@adeira/sx-design';
import type { Node } from 'react';

type Props = {
  +href:
    | string
    | {
        +pathname: string,
        +query: $FlowFixMe,
      },
  +as?: string,
  +locale?: string,
  +children: Node,

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
};

/**
 * This component wraps `Link` component from SX Design with Next.js `Link` component which is a
 * common pattern in Next.js applications using SX Design.
 *
 * See: https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
 */
export default function Link({
  href,
  children,
  as,
  locale,
  nextLinkComponent: NextLinkComponent,
}: Props): Node {
  return (
    <NextLinkComponent href={href} passHref={true} as={as} locale={locale}>
      {/* $FlowExpectedError[prop-missing]: `href` should be provided automatically thanks to `passHref` */}
      <SxDesignLink>{children}</SxDesignLink>
    </NextLinkComponent>
  );
}
