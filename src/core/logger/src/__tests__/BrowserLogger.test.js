// @flow

import Logger from '../Logger';
import BrowserLogger from '../BrowserLogger';

test.each([
  // logger input (will be spreaded) => expected output
  [['single'], [['single']]],
  [['aaa', 'bbb', 'ccc'], [['aaa', 'bbb', 'ccc']]],
  [['a %s c', 'b'], [['a %s c', 'b']]],
])('', (input, output) => {
  const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());

  function clearLocalMocks() {
    spyLog.mockClear();
    spyWarn.mockClear();
    spyError.mockClear();
  }

  logger.log(...input);
  expect(spyLog.mock.calls).toEqual(output);
  expect(spyWarn.mock.calls).toEqual([]);
  expect(spyError.mock.calls).toEqual([]);

  clearLocalMocks();

  logger.warn(...input);
  expect(spyLog.mock.calls).toEqual([]);
  expect(spyWarn.mock.calls).toEqual(output);
  expect(spyError.mock.calls).toEqual([]);

  clearLocalMocks();

  logger.error(...input);
  expect(spyLog.mock.calls).toEqual([]);
  expect(spyWarn.mock.calls).toEqual([]);
  expect(spyError.mock.calls).toEqual(output);

  jest.restoreAllMocks();
});
