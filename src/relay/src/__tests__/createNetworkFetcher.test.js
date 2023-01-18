// @flow

import createNetworkFetcher from '../createNetworkFetcher';

const originalFetch = globalThis.fetch;
beforeEach(() => {
  globalThis.fetch = jest.fn<empty, $FlowFixMe>().mockImplementation(() => ({
    headers: {
      get: () => 'application/json',
    },
    json: () => ({ mock: 'ok' }),
    text: () => {},
  }));
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

const request = { text: 'mocked request.text' };
const variables = { mock: true };
const expectedBody = '{"query":"mocked request.text","variables":{"mock":true}}';

it('works with additional headers', async () => {
  const fetcher = createNetworkFetcher('//localhost', {
    'X-Custom': 'Bearer 123',
    'X-Client': 'https://github.com/adeira/relay-example',
  });

  await expect(fetcher(request, variables)).resolves.toEqual({ mock: 'ok' });
  expect(fetch).toHaveBeenCalledWith('//localhost', {
    body: expectedBody,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'X-Custom': 'Bearer 123',
      'X-Client': 'https://github.com/adeira/relay-example',
    },
    method: 'POST',
  });
});

it('works with promised headers', async () => {
  const headers = new Promise<{ +[key: string]: string }>((resolve) => {
    // simulates somehow difficult and async way how to get headers (real-world example)
    resolve({
      'X-Client': 'https://github.com/adeira/relay-example',
    });
  });

  const fetcher = createNetworkFetcher('//localhost', headers);

  await expect(fetcher(request, variables)).resolves.toEqual({ mock: 'ok' });
  expect(fetch).toHaveBeenCalledWith('//localhost', {
    body: expectedBody,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'X-Client': 'https://github.com/adeira/relay-example',
    },
    method: 'POST',
  });
});

it('accepts fetchConfig', async () => {
  const fetcher = createNetworkFetcher(
    '//localhost',
    {
      'X-Client': 'https://github.com/adeira/relay-example',
    },
    {
      credentials: 'include',
    },
  );

  await expect(fetcher(request, variables)).resolves.toEqual({ mock: 'ok' });
  expect(fetch).toHaveBeenCalledWith('//localhost', {
    body: expectedBody,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'X-Client': 'https://github.com/adeira/relay-example',
    },
    method: 'POST',
    credentials: 'include',
  });
});
