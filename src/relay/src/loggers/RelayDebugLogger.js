// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type { LogEvent } from 'relay-runtime';

import logGroup from './logGroup';

export default function RelayDebugLogger(logEvent: LogEvent) {
  if (!__DEV__ || !isBrowser()) {
    return;
  }

  const { name, ...logEventParams } = logEvent;

  // this logger simply logs everything
  logGroup(`[Relay] ${logEvent.name}`, () => {
    console.log(logEventParams);
  });
}
