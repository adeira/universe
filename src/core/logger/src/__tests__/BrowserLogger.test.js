// @flow

import Logger from '../Logger';
import BrowserLogger from '../BrowserLogger';

it('logs into console', () => {
  const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());
  logger.log('aaa', 'bbb', 'ccc');
  expect(spy.mock.calls).toEqual([['aaa', 'bbb', 'ccc']]);
  spy.mockRestore();
});

it('warns into console', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());
  logger.warn('aaa', 'bbb', 'ccc');
  expect(spy.mock.calls).toEqual([['aaa', 'bbb', 'ccc']]);
  spy.mockRestore();
});

it('errors into console', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const logger = new Logger(new BrowserLogger());
  logger.error('aaa', 'bbb', 'ccc');
  expect(spy.mock.calls).toEqual([['aaa', 'bbb', 'ccc']]);
  spy.mockRestore();
});
