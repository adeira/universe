// @flow

import os from 'os';
import path from 'path';
import winston, { format, transports } from 'winston';
import { SPLAT } from 'triple-beam';
import { sprintf } from '@adeira/js';

import type { ILogger } from './ILogger';

const sprintfFormat = format.printf((info) => {
  // We do not return 'level' here since the API is trying to be similar to 'console.log' and
  // console doesn't print the level.
  const { message: rawMessage, [SPLAT]: splat } = info;
  return splat === undefined ? rawMessage : sprintf(rawMessage, ...splat);
});

/**
 * https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30#configure-your-datadog-agent
 * https://github.com/winstonjs/winston
 */
export default class NodejsLogger implements ILogger {
  #logfile = path.join(os.tmpdir(), 'com.kiwi.universe', 'combined.log');

  constructor() {
    winston.loggers.add('datadog', {
      exitOnError: false,
      format: format.combine(format.errors({ stack: true }), format.json()),
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
      format: format.combine(format.errors({ stack: true }), sprintfFormat),
      transports: [
        new transports.Console({
          consoleWarnLevels: ['warn'],
          stderrLevels: ['error'],
        }),
      ],
    });
  }

  log(...message: $ReadOnlyArray<string>) {
    this._console().info(...message);
  }

  warn(...message: $ReadOnlyArray<string>) {
    this._console().warn(...message);
    this._datadog().warn(...message);
  }

  error(...message: $ReadOnlyArray<string>) {
    this._console().error(...message);
    this._datadog().error(...message);
  }

  _console() {
    return winston.loggers.get('localhost');
  }

  _datadog() {
    return winston.loggers.get('datadog');
  }
}
