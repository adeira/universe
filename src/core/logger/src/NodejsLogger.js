// @flow

import os from 'os';
import path from 'path';
import winston, { format, transports } from 'winston';

import type { ILogger } from './ILogger';

/**
 * https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30#configure-your-datadog-agent
 * https://github.com/winstonjs/winston
 */
module.exports = class NodejsLogger implements ILogger {
  #logfile = path.join(os.tmpdir(), 'com.kiwi.universe', 'combined.log');

  constructor() {
    winston.loggers.add('datadog', {
      exitOnError: false,
      format: format.combine(
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [
        new transports.File({
          filename: this.#logfile,
          tailable: true,
          maxsize: 1024 * 1024 * 10, // 10 MB in bytes
          maxFiles: 1,
        }),
      ],
    });
    winston.loggers.add('localhost', {
      exitOnError: false,
      format: format.combine(
        format.errors({ stack: true }),
        format.splat(),
        format.colorize(),
        format.simple(),
      ),
      transports: [new transports.Console()],
    });
    this.log('Logs available in %s', this.#logfile);
  }

  log(...message: $ReadOnlyArray<string>) {
    winston.loggers.get('localhost').info(...message);
  }

  warn(...message: $ReadOnlyArray<string>) {
    winston.loggers.get('localhost').warn(...message);
    winston.loggers.get('datadog').warn(...message);
  }

  error(...message: $ReadOnlyArray<string>) {
    winston.loggers.get('localhost').error(...message);
    winston.loggers.get('datadog').error(...message);
  }
};
