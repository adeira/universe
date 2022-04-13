// @flow strict-local

import { sprintf, warning } from '@adeira/js';

import fetch from './fetch';
import TimeoutError from './TimeoutError';
import ResponseError from './ResponseError';

type InitWithRetries = $ReadOnly<{
  ...$Exact<RequestOptions>,
  +fetchTimeout?: number,
  +retryDelays?: $ReadOnlyArray<number>,
}>;

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

export { TimeoutError, ResponseError };

function isNodejs(): boolean %checks {
  // Next.js has global `process` object even in Browser so we have to be more thorough here.
  // Please, leave it written exactly like this: we have to first check if `process` exists
  // manually (a?.b would fail otherwise). Then we cannot assume `versions` exist.
  // $FlowExpectedError[unnecessary-optional-chain]: field `versions` doesn't have to exist (see Browsers env)
  return typeof process !== 'undefined' && process.versions?.node !== undefined;
}

function getEnvironmentHeaders(): { +'User-Agent': string } | null {
  return isNodejs()
    ? {
        // Cross-fetch uses node-fetch behind the scenes (in Node.js envs) which
        // sets default UA header (https://github.com/bitinn/node-fetch/blob/95286f52bb866283bc69521a04efe1de37b26a33/src/request.js#L225).
        // We overwrite it here to make clear where is this request actually
        // coming from. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
        'User-Agent': '@adeira/fetch (+https://github.com/adeira/universe)',
      }
    : null;
}

/**
 * Makes a request to the server with the given data as the payload.
 * Automatic retries are done based on the values in `retryDelays`.
 */
export default function fetchWithRetries(
  resource: string,
  initWithRetries?: InitWithRetries,
): Promise<Response> {
  const { fetchTimeout, retryDelays, headers: initHeaders, ...init } = initWithRetries ?? {};

  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;
  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  let requestsAttempted = 0;
  let requestStartTime = 0;

  return new Promise((resolve, reject) => {
    /**
     * Sends a request to the server that will timeout after `fetchTimeout`.
     * If the request fails or times out a new request might be scheduled.
     */
    function sendTimedRequest(): void {
      requestsAttempted++;
      requestStartTime = Date.now();
      let isRequestAlive = true;
      const request = fetch(resource, {
        ...init,
        headers: {
          ...getEnvironmentHeaders(),
          /* $FlowFixMe[exponential-spread](>=0.111.0) This comment suppresses an error when
           * upgrading Flow. To see the error delete this comment and run Flow.
           */
          ...initHeaders,
        },
      });
      const requestTimeout = setTimeout(() => {
        isRequestAlive = false;
        if (shouldRetry(requestsAttempted)) {
          retryRequest('HTTP timeout', resource);
        } else {
          reject(
            /* $FlowFixMe[invalid-constructor] This comment suppresses an error
             * when upgrading Flow to version 0.176.0. To see the error delete
             * this comment and run Flow. */
            new TimeoutError(
              sprintf(
                `fetchWithRetries: Failed to get response from server (${resource}), tried %s times.`,
                requestsAttempted,
              ),
            ),
          );
        }
      }, _fetchTimeout);

      request
        .then((response) => {
          // We got a response, we can clear the timeout.
          clearTimeout(requestTimeout);
          if (isRequestAlive) {
            if (response.status >= 200 && response.status < 300) {
              // Got a response code that indicates success, resolve the promise.
              resolve(response);
            } else if (shouldRetry(requestsAttempted, response.status)) {
              // Fetch was not successful, retrying.
              retryRequest(`HTTP error ${response.status}`, resource);
            } else {
              // Request was not successful, giving up.
              reject(
                /* $FlowFixMe[invalid-constructor] This comment suppresses an
                 * error when upgrading Flow to version 0.176.0. To see the
                 * error delete this comment and run Flow. */
                new ResponseError(
                  response,
                  sprintf(
                    'fetchWithRetries: Still no successful response after ' +
                      '%s retries, giving up.',
                    requestsAttempted,
                  ),
                ),
              );
            }
          }
        })
        .catch((error) => {
          clearTimeout(requestTimeout);
          if (shouldRetry(requestsAttempted)) {
            retryRequest(error.message, resource);
          } else {
            reject(error);
          }
        });
    }

    /**
     * Similar to `sendTimedRequest` except it completely ignores timeouts and retries.
     */
    function sendRequest(): void {
      const request = fetch(resource, {
        ...init,
        headers: {
          ...getEnvironmentHeaders(),
          /* $FlowFixMe[exponential-spread](>=0.111.0) This comment suppresses an error when
           * upgrading Flow. To see the error delete this comment and run Flow.
           */
          ...initHeaders,
        },
      });

      request
        .then((response) => {
          // We got a response, we can clear the timeout.
          if (response.status >= 200 && response.status < 300) {
            // Got a response code that indicates success, resolve the promise.
            resolve(response);
          } else {
            // Request was not successful, giving up.
            /* $FlowFixMe[invalid-constructor] This comment suppresses an error
             * when upgrading Flow to version 0.176.0. To see the error delete
             * this comment and run Flow. */
            reject(new ResponseError(response, 'fetch: No successful response, giving up.'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    }

    /**
     * Schedules another run of sendTimedRequest based on how much time has
     * passed between the time the last request was sent and now.
     */
    function retryRequest(reason, resource): void {
      warning(false, `fetchWithRetries: ${reason} (${resource}), retrying.`);

      const retryDelay = _retryDelays[requestsAttempted - 1];
      const retryStartTime = requestStartTime + retryDelay;
      // Schedule retry for a configured duration after last request started.
      setTimeout(sendTimedRequest, retryStartTime - Date.now());
    }

    /**
     * Checks if another attempt should be done to send a request to the server.
     * It returns false for non-transient HTTP status codes like 401 or 403.
     */
    function shouldRetry(attempt: number, statusCode?: number): boolean {
      const nonTransientCodes = [
        400, // Bad Request (it's not gonna be better next time)
        401, // Unauthorized (request is not authorized - next time the same)
        403, // Forbidden (server understands but refuses to authorize)
        422, // Unprocessable entity (wrong form body, unlikely to change from retry)
        429, // Too Many Requests (stop DDoS-ing, rate limiting); TODO: take into account `Retry-After` header https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After

        // TODO: consider every 4xx code?
        //  https://stackoverflow.com/q/47680711/3135248
      ];

      if (statusCode != null && nonTransientCodes.includes(statusCode)) {
        return false;
      }

      return attempt <= _retryDelays.length;
    }

    if (init.body == null || typeof init.body === 'string') {
      sendTimedRequest();
    } else {
      // We don't want to send "timed" request when the body is defined but it's not a string. For
      // example, it makes sense to retry GraphQL requests with JSON-stringified body, but it's not
      // a good idea to retry when the body is type of `FormData` for example (file upload).
      sendRequest();
    }
  });
}
