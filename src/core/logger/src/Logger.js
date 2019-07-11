// @flow

import type { ILogger } from './ILogger';

// https://github.com/facebookincubator/fbt/blob/master/runtime/nonfb/mocks/Banzai.js

export default class Logger implements ILogger {
  #logger: ILogger;

  constructor(logger: ?ILogger) {
    if (logger != null) {
      this.#logger = logger;
    } else if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      const NullLogger = require('./NullLogger').default;
      this.#logger = new NullLogger();
    } else if (typeof process !== 'undefined') {
      const NodejsLogger = require('./NodejsLogger').default;
      this.#logger = new NodejsLogger();
    } else if (typeof window !== 'undefined') {
      const BrowserLogger = require('./BrowserLogger').default;
      this.#logger = new BrowserLogger();
    } else {
      if (typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn(
          'Logger was unable to detect correct environment and falls back to silent NULL logger.',
        );
      }
      const NullLogger = require('./NullLogger').default;
      this.#logger = new NullLogger();
    }
  }

  log(...message: $ReadOnlyArray<string>) {
    this.#logger.log(...message);
  }

  warn(...message: $ReadOnlyArray<string>) {
    this.#logger.warn(...message);
  }

  error(...message: $ReadOnlyArray<string>) {
    this.#logger.error(...message);
  }
}
