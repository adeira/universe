// @flow strict

export default class ThresholdError extends Error {
  constructor(threshold: number) {
    super(`Threshold of ${threshold} reached.`);
    this.name = 'ThresholdError';
  }
}
