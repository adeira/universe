// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type { LogEvent } from 'relay-runtime';

function logGroup(groupMessage: string, groupBody: () => void): void {
  console.groupCollapsed(`%c%s`, `font-weight:bold`, groupMessage);
  groupBody();
  console.groupEnd();
}

export default function RelayLogger(logEvent: LogEvent) {
  if (!__DEV__ || !isBrowser()) {
    return;
  }

  const { name, ...logEventParams } = logEvent;

  // this logger simply logs everything
  logGroup(`[Relay] ${logEvent.name}`, () => {
    console.log(logEventParams);
  });
}
