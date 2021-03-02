// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type { LogEvent } from 'relay-runtime';

import logGroup from './logGroup';

const logEventsMap = new Map<
  number, // transactionID
  {
    +operationKind: 'mutation' | 'query' | 'subscription',
    +operationName: string,
    +variables: { +[string]: any, ... },
    +response?: any,
    ...
  },
>();

function createGroupMessage(operationName: ?string, operationKind: ?string): string {
  return `[Relay${operationKind != null ? ` ${operationKind}` : ''}] ${operationName ?? ''}`;
}

// Very similar to the eager one except it waits for the response and prints all the information at once.
export default function RelayLazyLogger(logEvent: LogEvent) {
  if (!__DEV__ || !isBrowser()) {
    return;
  }

  if (logEvent.name === 'network.start') {
    logEventsMap.set(logEvent.transactionID, {
      operationKind: logEvent.params.operationKind,
      operationName: logEvent.params.name,
      variables: logEvent.variables,
    });
  } else if (logEvent.name === 'network.next') {
    // TODO: log subscriptions as they arrive
    const savedEvent = logEventsMap.get(logEvent.transactionID);
    if (savedEvent) {
      logEventsMap.set(logEvent.transactionID, {
        ...savedEvent,
        response: logEvent.response,
      });
    }
  } else if (logEvent.name === 'network.complete' || logEvent.name === 'network.unsubscribe') {
    const savedEvent = logEventsMap.get(logEvent.transactionID);
    logGroup(createGroupMessage(savedEvent?.operationName, savedEvent?.operationKind), () => {
      console.log(`Variables: %o`, savedEvent?.variables);
      console.log(`Response: %o`, savedEvent?.response);
    });
  } else if (logEvent.name === 'network.error') {
    const savedEvent = logEventsMap.get(logEvent.transactionID);
    logGroup(
      createGroupMessage(savedEvent?.operationName, savedEvent?.operationKind),
      () => {
        console.error(logEvent.error);
      },
      undefined,
      'color:red',
    );
  } else if (
    logEvent.name === 'entrypoint.root.consume' ||
    logEvent.name === 'network.info' ||
    logEvent.name === 'queryresource.fetch' ||
    logEvent.name === 'queryresource.retain' ||
    logEvent.name === 'store.gc' ||
    logEvent.name === 'store.notify.complete' ||
    logEvent.name === 'store.notify.start' ||
    logEvent.name === 'store.notify.subscription' ||
    logEvent.name === 'store.publish' ||
    logEvent.name === 'store.restore' ||
    logEvent.name === 'store.snapshot'
  ) {
    // noop (explicitly so we know we covered everything)
  } else {
    checkEmpty(logEvent);
  }
}

function checkEmpty(logEvent: { name: empty, ... }): void {
  console.error('Relay: cannot decide how to log event: %s', JSON.stringify(logEvent));
}
