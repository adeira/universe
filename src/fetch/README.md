This package has been extracted from the original [fbjs](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/fetch/fetchWithRetries.js) library and it exposes single `fetchWithRetries`. This function is only a wrapper for any other well known [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). However, this fetch also solves these common problems:

- fetch timeouts
- retries, and
- request cancellations

This makes the fetch function more suitable for real-life production usage because it doesn't hang or fail easily. In other words you are not going to have many open connections just because the API is slow (this could kill your server completely) and your fetch won't give up if the API didn't respond for the first time (just some glitch and one retry would fix it).

# Installation

```
yarn add @adeira/fetch
```

# Usage

This fetch is basically drop-in replacement for any other fetch you use:

```js
import fetch from '@adeira/fetch';

(async () => {
  const response = await fetch('https://api.skypicker.com/locations?term=Barcelona');

  console.log(await response.json());
})();
```

There are however some interesting features on top of this API. You can for example change the internal timings (the defaults are good enough):

```js
import fetchWithRetries from '@adeira/fetch';

(async () => {
  try {
    const response = await fetchWithRetries(
      'https://cs-api.skypicker.com/public/numbers?country_code=er404', // this returns 404
      {
        fetchTimeout: 15000, // ms
        retryDelays: [1000, 3000], // ms
        // ...
        // see https://github.com/github/fetch/ for more options (headers, method, body, ...)
      },
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.response);
    console.error(error.response.status); // 404
    console.error(error.response.statusText); // NOT FOUND

    const response = await error.response.json();
    console.error(response); // { message: 'provided country_code does not exist', status: 'error' }
  }
})();
```

It does two things:

- it will timeout the connection after 15 seconds, and
- it will retry after 1 second and then after 3 seconds

Retries are performed in these situations:

- original fetch request failed
- fetch returned HTTP status <200 or >=300 (but some not transitive HTTP status codes like 401 or 403 are ignored)
- when the timeout (`fetchTimeout`) occurs

This package uses fetch [ponyfill](https://ponyfill.com/) internally (cross-fetch) so it supports server JS as well as browsers and React Native environment. It will always try to use global `fetch` if available before using this ponyfill.

# Error handling

You have to catch errors while fetching the response. This fetch throws these exceptions:

- standard fetch exception (`Error`) when request failed for some reason
- `TimeoutError` when fetch fails because of defined timeout
- `ResponseError` when final response returns HTTP status <200 or >=300

Example:

```js
import fetchWithRetries, { TimeoutError, ResponseError } from '@adeira/fetch';

(async () => {
  try {
    const response = await fetchWithRetries('//localhost');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.error('request timeouted');
    } else if (error instanceof ResponseError) {
      console.error('unsuccessful response', error.response);
    } else {
      console.error('unknown error');
    }
  }
})();
```

# Request cancellation

You can easily cancel any request via `AbortController` (https://developer.mozilla.org/en-US/docs/Web/API/AbortController) like so:

```js
const controller = new AbortController();
const signal = controller.signal;

const response = await fetchWithRetries('//localhost', {
  signal,
});

// You can cancel it somewhere from your code when needed (Relay network cleanup for example).
controller.abort();
```

# Frequently Asked Questions

## How does the timing work?

Let's have a look at this config:

```js
const config = {
  fetchTimeout: 2000,
  retryDelays: [100, 3000],
};
```

There are many situations that may occur (skipping happy path):

1. request immediately failed with HTTP status code 500
2. retries after 100ms
3. request successful (we are done), OR fail again
4. retries after 3000ms again for the last time

Example with timeouts:

1. first request takes too long and it's terminated after 2000ms
2. next retry was scheduled to be after 100ms but we already burned 2000ms so it's going to be executed immediately
3. second request takes to long as well and is terminated after 2000ms
4. last request will wait 3000ms minus the burned timeout => 1000ms
5. last attempt (it will timeout or resolve correctly)

In reality you can see some more optimistic scenarios: for example request failed with HTTP status code 500 and it's resolved immediately after you retry it (just some API glitch). Similar scenarios are quite often for timeouts: first try timeouted for some reason but it's OK when you try for the second time. This makes this fetch much better than the commonly used alternatives - this fetch does not expect success all the time and it tries to handle these real-world scenarios.

## How do I mock this fetch?

One way how to mock this fetch is to use [manual mock](https://jestjs.io/docs/en/manual-mocks) (`src/__mocks__/@adeira/fetch.js`):

```js
export default function fetchWithRetriesMock(resource: string) {
  return Promise.resolve(`MODIFIED ${resource.toUpperCase()} 1`);
}
```

And then just use it:

```js
import fetchWithRetriesMock from '@adeira/fetch';

jest.mock('@adeira/fetch');

it('mocks the fetch', async () => {
  await expect(fetchWithRetriesMock('input')).resolves.toBe('MODIFIED INPUT 1');
});
```

Alternatively, you could inline the mock:

```js
import fetchWithRetriesMock from '@adeira/fetch';

jest.mock('@adeira/fetch', () => {
  return (resource) => Promise.resolve(`MODIFIED ${resource.toUpperCase()} 2`);
});

it('mocks the fetch', async () => {
  await expect(fetchWithRetriesMock('input')).resolves.toBe('MODIFIED INPUT 2');
});
```

Why mocking `global.fetch` doesn't work? It's because this fetch doesn't use or pollute `global` variable: it uses ponyfill instead of polyfill behind the scenes.

### Msw, an alternative to mock fetch

There is an alternative to mocking the fetch function. You can use [msw](https://mswjs.io/)
What it does is start a service worker (yes it works in node as well) and that service worker stops the network request and returns mocked data.

> "_I found MSW and was thrilled that not only could I still see the mocked responses in my DevTools, but that the mocks didn't have to be written in a Service Worker and could instead live alongside the rest of my app. This made it silly easy to adopt. The fact that I can use it for testing as well makes MSW a huge productivity booster._"
>
> – [Kent C. Dodds](https://twitter.com/kentcdodds)
