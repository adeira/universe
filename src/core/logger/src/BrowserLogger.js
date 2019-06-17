// @flow strict

import type { ILogger } from './ILogger';

/* eslint-disable no-console */

export default class BrowserLogger implements ILogger {
  log(...message: $ReadOnlyArray<string>) {
    console.log(...message);
  }

  warn(...message: $ReadOnlyArray<string>) {
    console.warn(...message);
  }

  error(...message: $ReadOnlyArray<string>) {
    console.error(...message);
  }
}
