_Formerly known as `@mrtnzlml/fetch`_

This package has been extracted from the original [fbjs](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/fetch/fetchWithRetries.js) library and it exposes single `fetchWithRetries`. This function is only a wrapper for any other well known [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). However, this fetch also solves two common problems:

- fetch timeouts, and
- retries

This makes the fetch function more suitable for real-life production usage because it doesn't hang or fail easily. In other words you are not going to have many open connections just because the API is slow (this could kill your server completely) and your fetch won't give up if the API didn't respond for the first time (just some glitch and one retry would fix it).

# Installation

```
yarn add @kiwicom/fetch
```

# Usage

```js
import fetchWithRetries from '@kiwicom/fetch';

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
- fetch returned HTTP status <200 or >=300 (but not 401 or 403 since these errors are not transitive)
- when the timeout (`fetchTimeout`) occurs

This package uses fetch [ponyfill](https://ponyfill.com/) internally (cross-fetch) so it supports server JS as well as browsers.

# Error handling

You have to catch errors while fetching the response. This fetch throws these exceptions:

- standard fetch exception (`Error`) when request failed for some reason
- `TimeoutError` when fetch fails because of defined timeout
- `ResponseError` when final response returns HTTP status <200 or >=300

Example:

```js
import fetchWithRetries, { TimeoutError, ResponseError } from '@kiwicom/fetch';

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

# How does the timing work?

Let's have a look at this config:

```js
const config = {
  fetchTimeout: 2000,
  retryDelays: [100, 3000],
};
```

There are many situations that may occur (skipping happy path):

1. request failed with HTTP status code 500
2. retries after 100ms
3. request successful (we are done), OR fail again
4. retries after 3000ms again for the last time

Example with timeouts:

1. first request takes too long and it's terminated after 2000ms
2. next retry was scheduled to be after 100ms but we already burned 2000ms so it's going to be executed immediately
3. second request takes to long as well and is terminated after 2000ms
4. last request will wait 3000ms minus the burned timeout => 1000ms
5. last attempt (it will timeout or resolve correctly)
