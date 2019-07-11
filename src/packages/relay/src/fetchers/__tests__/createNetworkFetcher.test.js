// @flow

import originalFetch from '@kiwicom/fetch';

import createNetworkFetcher from '../createNetworkFetcher';

jest.mock('@kiwicom/fetch', () =>
  jest.fn().mockImplementation(() => ({
    headers: {
      get: () => 'application/json',
    },
    json: () => ({ mock: 'ok' }),
    text: () => {},
  })),
);

const request = { text: 'mocked request.text' };
const variables = { mock: true };
const expectedBody = '{"query":"mocked request.text","variables":{"mock":true}}';

it('works with additional headers', async () => {
  const fetcher = createNetworkFetcher('//localhost', {
    'X-Custom': 'Bearer 123',
    'X-Client': 'https://github.com/kiwicom/relay-example',
  });

  await expect(fetcher(request, variables)).resolves.toEqual({ mock: 'ok' });
  expect(originalFetch).toHaveBeenCalledWith('//localhost', {
    body: expectedBody,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-Custom': 'Bearer 123',
      'X-Client': 'https://github.com/kiwicom/relay-example',
    },
    method: 'POST',
  });
});

it('works with promised headers', async () => {
  const headers = new Promise(resolve => {
    // simulates somehow difficult and async way how to get headers (real-world example)
    resolve({
      'X-Client': 'https://github.com/kiwicom/relay-example',
    });
  });

  const fetcher = createNetworkFetcher('//localhost', headers);

  await expect(fetcher(request, variables)).resolves.toEqual({ mock: 'ok' });
  expect(originalFetch).toHaveBeenCalledWith('//localhost', {
    body: expectedBody,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-Client': 'https://github.com/kiwicom/relay-example',
    },
    method: 'POST',
  });
});

it('accepts refetchConfig', async () => {
  const fetcher = createNetworkFetcher(
    '//localhost',
    {
      'X-Client': 'https://github.com/kiwicom/relay-example',
    },
    {
      fetchTimeout: 60000,
      retryDelays: [200, 50000, 90],
    },
  );

  await expect(fetcher(request, variables)).resolves.toEqual({ mock: 'ok' });
  expect(originalFetch).toHaveBeenCalledWith('//localhost', {
    body: expectedBody,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-Client': 'https://github.com/kiwicom/relay-example',
    },
    method: 'POST',
    fetchTimeout: 60000,
    retryDelays: [200, 50000, 90],
  });
});
