// @flow

import { useRouter } from 'next/router';

export default function useApplicationLocale(): {
  +bcp47: 'en-US' | 'es-MX',
  +graphql: 'en_US' | 'es_MX',
} {
  const router = useRouter();
  // $FlowIssue[incompatible-cast] generic string is incompatible with these specific string literals
  const routerLocale = (router.locale: 'en-us' | 'es-mx');

  // Next.js router => Abacus application (+GraphQL)
  const applicationLocales = {
    'en-us': { bcp47: 'en-US', graphql: 'en_US' },
    'es-mx': { bcp47: 'es-MX', graphql: 'es_MX' },
  };

  return applicationLocales[routerLocale] ?? applicationLocales['en-us'];
}
