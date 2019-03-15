// @flow strict-local

import { sprintf, warning } from '@kiwicom/js';

import fetch from './fetch';
import TimeoutError from './TimeoutError';
import ResponseError from './ResponseError';

type InitWithRetries = {|
  ...$Exact<RequestOptions>,
  +fetchTimeout?: ?number,
  +retryDelays?: ?$ReadOnlyArray<number>,
|};

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

export { TimeoutError, ResponseError };

/**
 * Makes a request to the server with the given data as the payload.
 * Automatic retries are done based on the values in `retryDelays`.
 */
export default function fetchWithRetries(
  uri: string,
  initWithRetries?: ?InitWithRetries,
): Promise<Response> {
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};
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
      const request = fetch(uri, init);
      const requestTimeout = setTimeout(() => {
        isRequestAlive = false;
        if (shouldRetry(requestsAttempted)) {
          retryRequest('HTTP timeout', uri);
        } else {
          reject(
            new TimeoutError(
              sprintf(
                `fetchWithRetries: Failed to get response from server (${uri}), tried %s times.`,
                requestsAttempted,
              ),
            ),
          );
        }
      }, _fetchTimeout);

      request
        .then(response => {
          clearTimeout(requestTimeout);
          if (isRequestAlive) {
            // We got a response, we can clear the timeout.
            if (response.status >= 200 && response.status < 300) {
              // Got a response code that indicates success, resolve the promise.
              resolve(response);
            } else if (shouldRetry(requestsAttempted, response.status)) {
              // Fetch was not successful, retrying.
              retryRequest(`HTTP error ${response.status}`, uri);
            } else {
              // Request was not successful, giving up.
              reject(
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
        .catch(error => {
          clearTimeout(requestTimeout);
          if (shouldRetry(requestsAttempted)) {
            retryRequest(error.message, uri);
          } else {
            reject(error);
          }
        });
    }

    /**
     * Schedules another run of sendTimedRequest based on how much time has
     * passed between the time the last request was sent and now.
     */
    function retryRequest(reason, uri): void {
      warning(false, `fetchWithRetries: ${reason} (${uri}), retrying.`);

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
        401, // Unauthorized (it's not gonna be authorized)
        403, // Forbidden

        // TODO: consider every 4xx code?
        //  https://stackoverflow.com/q/47680711/3135248
      ];

      if (statusCode != null && nonTransientCodes.includes(statusCode)) {
        return false;
      }

      return attempt <= _retryDelays.length;
    }

    sendTimedRequest();
  });
}
