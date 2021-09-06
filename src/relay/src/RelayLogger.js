// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type { LogEvent, OperationAvailability } from 'relay-runtime';

function renderQueryAvailability(
  queryAvailability: OperationAvailability,
  shouldFetch: boolean,
): string {
  if (queryAvailability.status === 'available') {
    const fetchTime = queryAvailability.fetchTime;
    if (fetchTime != null) {
      const seconds = Math.round((Date.now() - fetchTime) / 1000);
      return `🟢 ${seconds}s old${shouldFetch ? ', re-fetching' : ''}`;
    }
    return `🟢 ${shouldFetch ? 're-fetching' : ''}`;
  } else if (queryAvailability.status === 'stale') {
    return `🟠 ${shouldFetch ? 're-fetching' : ''}`;
  } else if (queryAvailability.status === 'missing') {
    return `🔴 ${shouldFetch ? 'fetching' : ''}`;
  }
  (queryAvailability.status: empty);
  return '';
}

export default function RelayLogger(logEvent: LogEvent) {
  if (!__DEV__ || !isBrowser()) {
    return;
  }

  if (
    logEvent.name === 'queryresource.retain' ||
    logEvent.name === 'network.start' || // see `execute.start`
    logEvent.name === 'network.next' || // see `execute.next`
    logEvent.name === 'network.error' || // see `execute.error`
    logEvent.name === 'network.complete' // see `execute.complete`
  ) {
    // We skip some events that are not that useful for normal development.
  } else if (logEvent.name === 'execute.start') {
    // Prints information about the beginning of mutation/query/subscription (operation) execution.
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%c%s%c%s%c%s',
      'font-weight:bold',
      '[Relay] ',
      'font-weight:normal',
      `${name} `,
      'font-weight:bold',
      logEventParams.params.name,
    );
    console.log(logEventParams);
    console.groupEnd();
  } else if (logEvent.name === 'queryresource.fetch') {
    // Prints additional information about the presence/staleness of data and whether it's going to
    // be (re)fetched or not. See:
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/availability-of-data/
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/presence-of-data/
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/staleness-of-data/
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%c%s%c%s%s',
      'font-weight:bold',
      '[Relay] ',
      'font-weight:normal',
      `${name} `,
      renderQueryAvailability(logEventParams.queryAvailability, logEventParams.shouldFetch),
    );
    console.log(logEventParams);
    console.groupEnd();
  } else {
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed('%c%s%c%s', 'font-weight:bold', '[Relay] ', 'font-weight:normal', name);
    console.log(logEventParams);
    console.groupEnd();
  }
}
