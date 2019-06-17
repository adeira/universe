// @flow

import Logger from '../Logger';
import NullLogger from '../NullLogger';

it('does nothing', () => {
  const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const spyError = jest.spyOn(console, 'error').mockImplementation(() => {});

  const logger = new Logger(new NullLogger());
  logger.log('aaa', 'bbb', 'ccc');
  logger.warn('aaa', 'bbb', 'ccc');
  logger.error('aaa', 'bbb', 'ccc');

  expect(spyLog.mock.calls).toEqual([]);
  expect(spyWarn.mock.calls).toEqual([]);
  expect(spyError.mock.calls).toEqual([]);
  jest.restoreAllMocks();
});
