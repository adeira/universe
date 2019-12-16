// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';

import type { Variables } from './types.flow';

export type LogEvent =
  | {|
      +name: 'queryresource.fetch',
      +operation: mixed, // TODO: OperationDescriptor type
      // FetchPolicy from relay-experimental
      +fetchPolicy: string,
      // RenderPolicy from relay-experimental
      +renderPolicy: string,
      +hasFullQuery: boolean,
      +shouldFetch: boolean,
    |}
  | {|
      +name: 'execute.info',
      +transactionID: number,
      +info: mixed,
    |}
  | {|
      +name: 'execute.start',
      +transactionID: number,
      +params: {
        // TODO: RequestParameters type
        +name: string,
        +operationKind: string,
        +text: string,
        ...
      },
      +variables: Variables,
    |}
  | {|
      +name: 'execute.next',
      +transactionID: number,
      +response: mixed, // TODO: GraphQLResponse type
    |}
  | {|
      +name: 'execute.error',
      +transactionID: number,
      +error: Error,
    |}
  | {|
      +name: 'execute.complete',
      +transactionID: number,
    |}
  | {|
      +name: 'execute.unsubscribe',
      +transactionID: number,
    |};

function logGroup(logEvent, groupBody?: () => void, groupNote?: string, style: string = ''): void {
  const logName = logEvent.name;
  const message = `[Relay ${logEvent.transactionID}] ${logName}`;
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
        logEvent.params.name,
      );
      break;
    case 'execute.next':
      logGroup(logEvent, () => {
        console.log(`Response: %o`, logEvent.response);
      });
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
      // don't even print these
      break;
    default:
      (logEvent: empty);
      break;
  }
}
