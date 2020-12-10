// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetch from '@adeira/fetch';

async function fetchQuery(request, variables) {
  const response = await fetch('http://127.0.0.1:8080/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return response.json();
}

export default (new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
}): Environment);
