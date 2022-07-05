// @flow

import * as React from 'react';
import { usePreloadedQuery, type PreloadedQuery } from '@adeira/relay';
import type { Context } from 'next';

import LanguageTag from '../src/LanguageTag';
import Menu, { MenuQuery } from '../src/Menu';
import relayPreloadQuery from '../src/relayPreloadQuery';
import type { MenuQuery as MenuQueryType } from '../src/__generated__/MenuQuery.graphql';

type Props = {
  +relayPreloadedQueryRefs: {
    +menuQuery: PreloadedQuery<MenuQueryType>,
  },
};

export default function MenuPage(props: Props): React.Node {
  const data = usePreloadedQuery(MenuQuery, props.relayPreloadedQueryRefs.menuQuery);
  return <Menu relayFragmentRef={data} />;
}

export async function getServerSideProps({ locale }: Context): Promise<$FlowFixMe> {
  return {
    props: {
      relayPreloadedQueries: {
        menuQuery: await relayPreloadQuery<MenuQueryType>(MenuQuery, {
          clientLocale: LanguageTag.detectLanguageTag(locale).graphql,
        }),
      },
    },
  };
}
