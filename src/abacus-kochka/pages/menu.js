// @flow

import * as React from 'react';
import { usePreloadedQuery } from '@adeira/relay';
import type { Context } from 'next';

import LanguageTag from '../src/LanguageTag';
import Menu, { MenuQuery } from '../src/Menu';
import relayPreloadQuery from '../src/relayPreloadQuery';

type Props = {
  +relayPreloadedQueryRefs: {
    +menuQuery: $FlowFixMe,
  },
};

export default function MenuPage(props: Props): React.Node {
  const data = usePreloadedQuery(MenuQuery, props.relayPreloadedQueryRefs.menuQuery);
  return <Menu fragmentReference={data} />;
}

export async function getServerSideProps({ locale }: Context): Promise<{
  +props: { +relayPreloadedQueries: { +menuQuery: $FlowFixMe } },
}> {
  // TODO: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr

  return {
    props: {
      relayPreloadedQueries: {
        menuQuery: await relayPreloadQuery(MenuQuery, {
          clientLocale: LanguageTag.detectLanguageTag(locale).graphql,
        }),
      },
    },
  };
}
