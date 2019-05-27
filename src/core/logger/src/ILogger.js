// @flow strict

export interface ILogger {
  /**
   * "Log" is just an informative message which should be displayed only on
   * localhost to the developer and should not be sent to Datadog.
   */
  log(...message: $ReadOnlyArray<string>): void;

  /**
   * "Warn" should be displayed to developer and at the same time logged to Datadog.
   */
  warn(...message: $ReadOnlyArray<string>): void;

  /**
   * "Error" should be displayed to developer and at the same time logged to Datadog.
   */
  error(...message: $ReadOnlyArray<string>): void;
}
