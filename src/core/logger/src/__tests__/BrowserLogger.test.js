// @flow

import Logger from '../Logger';
import BrowserLogger from '../BrowserLogger';

it('logs into console', () => {
  const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());
  logger.log('a', 'b', 'c');
  expect(spy.mock.calls).toEqual([['a', 'b', 'c']]);
  spy.mockRestore();
});

it('warns into console', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());
  logger.warn('a', 'b', 'c');
  expect(spy.mock.calls).toEqual([['a', 'b', 'c']]);
  spy.mockRestore();
});

it('errors into console', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());
  logger.error('a', 'b', 'c');
  expect(spy.mock.calls).toEqual([['a', 'b', 'c']]);
  spy.mockRestore();
});
