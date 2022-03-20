// @flow

import Deferred from './Deferred';
import fetch from '../fetch';
import flushPromises from './_flushPromises';

jest.mock('../fetch');

it('has a corresponding `Deferred` for each call to `fetch`', async () => {
  expect(fetch.mock.calls).toHaveLength(0);
  expect(fetch.mock.deferreds).toHaveLength(0);

  const fetchPromise = fetch('//localhost', {});
  expect(fetch.mock.calls).toHaveLength(1);
  expect(fetch.mock.deferreds).toHaveLength(1);

  const deferred = fetch.mock.deferreds[0];
  expect(deferred instanceof Deferred).toBe(true);

  const mockCallback = jest.fn();
  const mockResult = {};
  expect(mockCallback).not.toHaveBeenCalled();
  fetchPromise.then(mockCallback);
  deferred.resolve(mockResult);

  await flushPromises();

  expect(mockCallback).toHaveBeenCalledWith(mockResult);
});
