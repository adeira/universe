// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type { LogEvent } from 'relay-runtime';

import logGroup from './logGroup';

// See: https://github.com/facebook/relay/commit/da9a57cb0b7ab9bedf82e3d1dddc17a0ad9e4d92
export default function RelayEagerLogger(logEvent: LogEvent) {
  if (!__DEV__ || !isBrowser()) {
    return;
  }

  const transactionID = logEvent.transactionID != null ? logEvent.transactionID : 99_998; // so it clearly results in "-1"
  const groupMessage = `[Relay ${transactionID - 99_999}] ${logEvent.name}`;

  if (logEvent.name === 'network.start') {
    logGroup(
      groupMessage,
      () => {
        console.log(`Variables: %o`, logEvent.variables);
        console.log(logEvent.params.text); // TODO: ID for persistent queries
      },
      `${logEvent.params.name} ${
        logEvent.params.operationKind === 'mutation'
          ? `📝 (${logEvent.params.text?.length ?? 0})`
          : `🔍 (${logEvent.params.text?.length ?? 0})`
      }`,
    );
  } else if (logEvent.name === 'network.next') {
    if (Array.isArray(logEvent.response)) {
      // we do not support batch response with @stream yet
      console.warn(logEvent.response);
    } else if (logEvent.response.errors !== undefined) {
      logGroup(
        groupMessage,
        () => {
          console.log(`Response: %o`, logEvent.response);
        },
        'partial response with errors',
        'color:orange',
      );
    } else {
      logGroup(groupMessage, () => {
        console.log(`Response: %o`, logEvent.response);
      });
    }
  } else if (logEvent.name === 'network.error') {
    logGroup(
      groupMessage,
      () => {
        console.error(logEvent.error);
      },
      undefined,
      'color:red',
    );
  } else if (logEvent.name === 'network.complete' || logEvent.name === 'network.unsubscribe') {
    logGroup(groupMessage);
  } else if (
    logEvent.name === 'entrypoint.root.consume' ||
    logEvent.name === 'network.info' ||
    logEvent.name === 'queryresource.fetch' ||
    logEvent.name === 'queryresource.retain' ||
    logEvent.name === 'store.gc' ||
    logEvent.name === 'store.notify.complete' ||
    logEvent.name === 'store.notify.start' ||
    logEvent.name === 'store.publish' ||
    logEvent.name === 'store.restore' ||
    logEvent.name === 'store.snapshot'
  ) {
    // explicit noop
  } else {
    checkEmpty(logEvent);
  }
}

function checkEmpty(logEvent: { name: empty, ... }): void {
  console.error('Relay: cannot decide how to log event: %s', JSON.stringify(logEvent));
}
