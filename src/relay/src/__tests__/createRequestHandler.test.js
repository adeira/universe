// @flow

import createRequestHandler from '../createRequestHandler';

let list;
beforeEach(() => {
  list = [];
  jest.resetModules();
});

const observer = {
  start: () => list.push('start'),
  next: val => {
    return list.push(`next:${typeof val === 'object' ? JSON.stringify(val) : val}`);
  },
  error: err => list.push(err),
  complete: () => list.push('complete'),
  unsubscribe: () => list.push('unsubscribe'),
};

it('works as expected with query and empty cache', done => {
  expect.assertions(4);

  const burstCacheMock = {
    clear: () => {},
    get: () => null, // cache empty
    set: () => {},
  };

  const requestNode = { operationKind: 'query' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toEqual(requestNode);
    expect(b).toEqual(variables);
    expect(c).toEqual(uploadables);
    return Promise.resolve('data');
  }, burstCacheMock);

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toEqual(['start', 'next:data', 'complete']);
      done();
    })
    .subscribe(observer);
});

it('works as expected with query and full cache', done => {
  expect.assertions(3);

  const burstCacheMock = {
    clear: () => {},
    get: (queryID, variables) => {
      expect(queryID).toBe('yay, queryID');
      expect(variables).toEqual({ aaa: 111 });
      return 'fromCache';
    },
    set: () => {},
  };

  const requestHandler = createRequestHandler(() => {
    throw new Error('should not be called in this scenario (reading from cache)');
  }, burstCacheMock);

  const observable = requestHandler(
    { operationKind: 'query', text: 'yay, queryID' }, // requestNode
    { aaa: 111 }, // variables
    {}, // cacheConfig
    {}, // uploadables
  );

  observable
    .finally(() => {
      expect(list).toEqual(['start', 'next:fromCache', 'complete']);
      done();
    })
    .subscribe(observer);
});

it('works as expected with query error', done => {
  expect.assertions(5);
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const burstCacheMock = {
    clear: () => {},
    get: () => null, // cache empty
    set: () => {},
  };

  const requestNode = { operationKind: 'query' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toEqual(requestNode);
    expect(b).toEqual(variables);
    expect(c).toEqual(uploadables);
    return Promise.resolve({
      data: null,
      errors: [{ message: 'error 1' }, { message: 'error 2' }],
    });
  }, burstCacheMock);

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toEqual([
        'start',
        'next:{"data":null,"errors":[{"message":"error 1"},{"message":"error 2"}]}',
        'complete',
      ]);
      expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "error 1",
            Object {
              "message": "error 1",
            },
          ],
          Array [
            "error 2",
            Object {
              "message": "error 2",
            },
          ],
        ]
      `);
      consoleSpy.mockRestore();
      done();
    })
    .subscribe(observer);
});

it('works as expected with mutation', done => {
  expect.assertions(5);

  const burstCacheClear = jest.fn();
  const burstCacheMock = {
    clear: burstCacheClear,
    get: () => null, // cache empty
    set: () => {},
  };

  const requestNode = { operationKind: 'mutation' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toEqual(requestNode);
    expect(b).toEqual(variables);
    expect(c).toEqual(uploadables);
    return Promise.resolve('data');
  }, burstCacheMock);

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toEqual(['start', 'next:data', 'complete']);
      expect(burstCacheClear).toHaveBeenCalledTimes(1);
      done();
    })
    .subscribe(observer);
});

it('works as expected with mutation error', done => {
  expect.assertions(5);
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const burstCacheMock = {
    clear: () => {},
    get: () => null, // cache empty
    set: () => {},
  };

  const requestNode = { operationKind: 'mutation' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toEqual(requestNode);
    expect(b).toEqual(variables);
    expect(c).toEqual(uploadables);
    return Promise.resolve({
      data: null,
      errors: [{ message: 'error 1' }, { message: 'error 2' }],
    });
  }, burstCacheMock);

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toEqual([
        'start',
        'next:{"data":null,"errors":[{"message":"error 1"},{"message":"error 2"}]}',
        'complete',
      ]);
      expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "error 1",
            Object {
              "message": "error 1",
            },
          ],
          Array [
            "error 2",
            Object {
              "message": "error 2",
            },
          ],
        ]
      `);
      consoleSpy.mockRestore();
      done();
    })
    .subscribe(observer);
});
