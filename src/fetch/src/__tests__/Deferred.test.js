// @flow

import Deferred from './Deferred';
import flushPromises from './_flushPromises';

it('works as expected - resolves', async () => {
  const deferred = new Deferred();
  const promise = deferred.getPromise();
  expect(promise).toBeInstanceOf(Promise);

  const handleThen = jest.fn();
  const handleCatch = jest.fn();
  /* $FlowFixMe[unused-promise-in-async-scope] This comment suppresses an error
   * when upgrading Flow to version 0.192.0. To see the error delete this
   * comment and run Flow. */
  promise.then(handleThen).catch(handleCatch);

  expect(deferred.isSettled()).toBe(false);
  deferred.resolve('ok');
  expect(deferred.isSettled()).toBe(true);

  await flushPromises();

  expect(handleThen).toHaveBeenNthCalledWith(1, 'ok');
  expect(handleCatch).not.toHaveBeenCalled();
});

it('works as expected - rejects', async () => {
  const deferred = new Deferred();
  const promise = deferred.getPromise();
  expect(promise).toBeInstanceOf(Promise);

  const handleThen = jest.fn();
  const handleCatch = jest.fn();
  /* $FlowFixMe[unused-promise-in-async-scope] This comment suppresses an error
   * when upgrading Flow to version 0.192.0. To see the error delete this
   * comment and run Flow. */
  promise.then(handleThen).catch(handleCatch);

  expect(deferred.isSettled()).toBe(false);
  deferred.reject('error');
  expect(deferred.isSettled()).toBe(true);

  await flushPromises();

  expect(handleThen).not.toHaveBeenCalled();
  expect(handleCatch).toHaveBeenNthCalledWith(1, 'error');
});

it('works as expected - alternative approach to resolve', async () => {
  const deferred = new Deferred();

  const handleThen = jest.fn();
  const handleCatch = jest.fn();
  /* $FlowFixMe[unused-promise-in-async-scope] This comment suppresses an error
   * when upgrading Flow to version 0.192.0. To see the error delete this
   * comment and run Flow. */
  deferred.then(handleThen).catch(handleCatch);

  expect(deferred.isSettled()).toBe(false);
  deferred.resolve('ok');
  expect(deferred.isSettled()).toBe(true);

  await flushPromises();

  expect(handleThen).toHaveBeenNthCalledWith(1, 'ok');
  expect(handleCatch).not.toHaveBeenCalled();
});
