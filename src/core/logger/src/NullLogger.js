// @flow strict

import type { ILogger } from './ILogger';

/* eslint-disable no-unused-vars */

export default class NullLogger implements ILogger {
  log(...message: $ReadOnlyArray<string>) {}
  warn(...message: $ReadOnlyArray<string>) {}
  error(...message: $ReadOnlyArray<string>) {}
}
