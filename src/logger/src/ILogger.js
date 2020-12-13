// @flow strict

export interface ILogger {
  log(...message: $ReadOnlyArray<string>): void;

  warn(...message: $ReadOnlyArray<string>): void;

  error(...message: $ReadOnlyArray<string>): void;
}
