// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type { LogEvent } from 'relay-runtime';

function logGroup(logEvent, groupBody?: () => void, groupNote?: string, style: string = ''): void {
  const logName = logEvent.name;
  const message = `[Relay ${logEvent.transactionID - 99999}] ${logName}`;
  if (groupBody == null) {
    console.log('%c%s', 'font-weight:bold', message);
  } else {
    if (groupNote != null) {
      console.groupCollapsed(
        `%c%s%c%s`,
        `font-weight:bold;${style}`,
        message,
        'font-weight:normal',
        ` - ${groupNote}`,
      );
    } else {
      console.groupCollapsed(`%c%s`, `font-weight:bold;${style}`, message);
    }
    groupBody();
    console.groupEnd();
  }
}

// See: https://github.com/facebook/relay/commit/da9a57cb0b7ab9bedf82e3d1dddc17a0ad9e4d92
export default function RelayLogger(logEvent: LogEvent) {
  if (!__DEV__ || !isBrowser()) {
    return;
  }
  switch (logEvent.name) {
    case 'execute.start':
      logGroup(
        logEvent,
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
      break;
    case 'execute.next':
      if (Array.isArray(logEvent.response)) {
        // we do not support batch response with @stream yet
        console.warn(logEvent.response);
        break;
      } else if (logEvent.response.errors !== undefined) {
        logGroup(
          logEvent,
          () => {
            console.log(`Response: %o`, logEvent.response);
          },
          'partial response with errors',
          'color:orange',
        );
      } else {
        logGroup(logEvent, () => {
          console.log(`Response: %o`, logEvent.response);
        });
      }
      break;
    case 'execute.error':
      logGroup(
        logEvent,
        () => {
          console.error(logEvent.error);
        },
        undefined,
        'color:red',
      );
      break;
    case 'execute.info':
    case 'execute.complete':
    case 'execute.unsubscribe':
      logGroup(logEvent);
      break;
    case 'queryresource.fetch':
    case 'queryresource.retain':
      // don't even print these
      break;
    default:
      checkEmpty(logEvent);
      break;
  }
}

function checkEmpty(logEvent: { name: empty, ... }): void {
  console.error('Relay: cannot decide how to log event: %s', JSON.stringify(logEvent));
}
