/* eslint-disable flowtype/require-valid-file-annotation */

import { ProxiedError } from '../../src/services/errors/ProxiedError';

test('Error', () => {
  expect(new Error()).toBeError();
  expect(new ProxiedError()).toBeError();
});

test('Error - fail', () => {
  expect(() => {
    expect(42).toBeError();
  }).toThrowError('expected 42 to be instance of Error, number given');
});

test('Error with interesting message', () => {
  expect(new Error('custom message')).toBeError('custom message');
  expect(new ProxiedError('custom message')).toBeError('custom message');
});

test('Error with not interesting message', () => {
  expect(new Error('message')).toBeError();
  expect(new ProxiedError('message')).toBeError();
});

test('Error with message - fail 1', () => {
  expect(() => {
    expect(new Error()).toBeError('custom message');
  }).toThrowError(
    /^Expected Error message to be:[\s\S]+"custom message"[\s\S]+Received:[\s\S]+""/,
  );
});

test('Error with message - fail 2', () => {
  expect(() => {
    expect(new Error(42)).toBeError('custom message');
  }).toThrowError(
    /^Expected Error message to be:[\s\S]+"custom message"[\s\S]+Received:[\s\S]+"42"/,
  );
});

test('Error with message - fail 3', () => {
  expect(() => {
    expect(new Error('abc')).toBeError('custom message');
  }).toThrowError(
    /^Expected Error message to be:[\s\S]+"custom message"[\s\S]+Received:[\s\S]+"abc"/,
  );
});

test('negated Error', () => {
  expect(42).not.toBeError();
});

test('negated Error - fail', () => {
  expect(() => {
    expect(new Error()).not.toBeError();
  }).toThrowError('expected value NOT to be instance of Error');
});

test('resolves Promise', async () => {
  await expect(Promise.resolve(42)).resolves.not.toBeError();
});

test('rejects Promise', async () => {
  await expect(Promise.reject(new Error())).rejects.toBeError();
});

test('rejects Promise with message', async () => {
  await expect(Promise.reject(new Error('custom message'))).rejects.toBeError(
    'custom message',
  );
});
