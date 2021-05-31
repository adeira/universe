// @flow

import createRequestHandler from '../createRequestHandler';

let list;
beforeEach(() => {
  list = [];
  jest.resetModules();
});

const observer = {
  start: () => list.push('start'),
  next: (val) => {
    return list.push(`next:${typeof val === 'object' ? JSON.stringify(val) : val}`);
  },
  error: (err) => list.push(err),
  complete: () => list.push('complete'),
  unsubscribe: () => list.push('unsubscribe'),
};

it('works as expected with query success', (done) => {
  expect.assertions(4);

  const requestNode = { operationKind: 'query' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toStrictEqual(requestNode);
    expect(b).toStrictEqual(variables);
    expect(c).toStrictEqual(uploadables);
    return Promise.resolve('data');
  });

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toStrictEqual(['start', 'next:data', 'complete']);
      done();
    })
    .subscribe(observer);
});

it('works as expected with query error', (done) => {
  expect.assertions(5);
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const requestNode = { operationKind: 'query' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toStrictEqual(requestNode);
    expect(b).toStrictEqual(variables);
    expect(c).toStrictEqual(uploadables);
    return Promise.resolve({
      data: null,
      errors: [{ message: 'error 1' }, { message: 'error 2' }],
    });
  });

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toStrictEqual([
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

it('works as expected with CRITICAL query error', (done) => {
  expect.assertions(5);
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const requestNode = { operationKind: 'query' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toStrictEqual(requestNode);
    expect(b).toStrictEqual(variables);
    expect(c).toStrictEqual(uploadables);
    return Promise.resolve({
      data: null,
      errors: [
        { message: 'error 1' },
        { message: 'error 2', extensions: { severity: 'CRITICAL' } },
      ],
    });
  });

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toStrictEqual(['start', new Error('error 2')]);
      expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "error 1",
            Object {
              "message": "error 1",
            },
          ],
        ]
      `);
      consoleSpy.mockRestore();
      done();
    })
    .subscribe(observer);
});

it('works as expected with mutation', (done) => {
  expect.assertions(4);

  const requestNode = { operationKind: 'mutation' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toStrictEqual(requestNode);
    expect(b).toStrictEqual(variables);
    expect(c).toStrictEqual(uploadables);
    return Promise.resolve('data');
  });

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toStrictEqual(['start', 'next:data', 'complete']);
      done();
    })
    .subscribe(observer);
});

it('works as expected with mutation error', (done) => {
  expect.assertions(5);
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const requestNode = { operationKind: 'mutation' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toStrictEqual(requestNode);
    expect(b).toStrictEqual(variables);
    expect(c).toStrictEqual(uploadables);
    return Promise.resolve({
      data: null,
      errors: [{ message: 'error 1' }, { message: 'error 2' }],
    });
  });

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toStrictEqual([
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

it('works as expected with CRITICAL mutation error', (done) => {
  expect.assertions(5);
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const requestNode = { operationKind: 'mutation' };
  const variables = { aaa: 111 };
  const uploadables = {};

  const requestHandler = createRequestHandler((a, b, c) => {
    expect(a).toStrictEqual(requestNode);
    expect(b).toStrictEqual(variables);
    expect(c).toStrictEqual(uploadables);
    return Promise.resolve({
      data: null,
      errors: [
        { message: 'error 1' },
        { message: 'error 2', extensions: { severity: 'CRITICAL' } },
      ],
    });
  });

  const observable = requestHandler(
    requestNode,
    variables,
    {}, // cacheConfig
    uploadables,
  );

  observable
    .finally(() => {
      expect(list).toStrictEqual(['start', new Error('error 2')]);
      expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "error 1",
            Object {
              "message": "error 1",
            },
          ],
        ]
      `);
      consoleSpy.mockRestore();
      done();
    })
    .subscribe(observer);
});
