// @flow strict

import type { ILogger } from './ILogger';

/* eslint-disable no-unused-vars */

module.exports = class NullLogger implements ILogger {
  log(...message: $ReadOnlyArray<string>) {}
  warn(...message: $ReadOnlyArray<string>) {}
  error(...message: $ReadOnlyArray<string>) {}
};
