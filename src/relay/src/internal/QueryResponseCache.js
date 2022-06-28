// @flow

import { QueryResponseCache } from 'relay-runtime';

const ONE_MINUTE_IN_MS = 60 * 1000;
export default (new QueryResponseCache({
  size: 10,
  ttl: ONE_MINUTE_IN_MS,
}): QueryResponseCache);
