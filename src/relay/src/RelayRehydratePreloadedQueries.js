// @flow

import { useMemo, Suspense, type Node } from 'react';
import { useRelayEnvironment } from 'react-relay';

type Props = {
  +Component: $FlowFixMe,
  +pageProps: $FlowFixMe,
};

/**
 * This is an experimental (hence not document) component to allow a support for preloaded queries
 * in Next.js applications. It should be used somewhere in `_app.js` somewhere below
 * `RelayEnvironmentProvider` in the React tree. Additionally, it should be combined with Next.js
 * like so:
 *
 * ```
 * const MenuQuery = graphql`
 *   query MenuQuery() {
 *     ...MenuFragment
 *   }
 * `;
 *
 * export default function MenuPage(props): React.Node {
 *   const data = usePreloadedQuery(MenuQuery, props.relayPreloadedQueryRefs.menuQuery);
 *   return <Menu fragmentReference={data} />;
 * }
 *
 * export async function getServerSideProps(context) {
 *   return {
 *     props: {
 *       relayPreloadedQueries: {
 *         menuQuery: await relayPreloadQuery(MenuQuery, {}),
 *       },
 *     },
 *   };
 * }
 * ```
 */
export default function RelayRehydratePreloadedQueries({ Component, pageProps }: Props): Node {
  const environment = useRelayEnvironment();

  const transformedProps = useMemo(() => {
    if (pageProps == null) {
      return pageProps;
    }
    const { relayPreloadedQueries, ...otherProps } = pageProps;
    if (relayPreloadedQueries == null) {
      return pageProps;
    }

    const relayPreloadedQueryRefs = {};
    // $FlowFixMe[incompatible-use]
    for (const [queryName, { params, variables, response }] of Object.entries(
      relayPreloadedQueries,
    )) {
      // $FlowFixMe[prop-missing]: property responseCache is missing in INetwork
      environment.getNetwork().responseCache.set(params.cacheID, variables, response);

      relayPreloadedQueryRefs[queryName] = {
        environment,
        fetchKey: params.id,
        fetchPolicy: 'store-or-network',
        isDisposed: false,
        name: params.name,
        kind: 'PreloadedQuery',
        variables,
      };
    }

    return { ...otherProps, relayPreloadedQueryRefs };
  }, [pageProps, environment]);

  return (
    <Suspense fallback={<div data-testid="loading">Loading…</div>}>
      <Component {...transformedProps} />
    </Suspense>
  );
}
