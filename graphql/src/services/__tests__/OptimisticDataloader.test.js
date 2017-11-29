// @flow

import OptimisticDataloader from '../OptimisticDataloader';

let loader;

beforeEach(() => {
  loader = new OptimisticDataloader(keys =>
    Promise.all(
      keys.map((key, index) => {
        if (index === 5) {
          return new TypeError('ups');
        }
        if (index % 2 !== 0) {
          return new Error(`for key "${key}"`);
        }
        return key;
      }),
    ),
  );
});

it('keeps Error instances as values', async () => {
  expect(await loader.loadMany([1, 2, 3, 4, 5])).toMatchSnapshot();
});

it('rejects the batch if TypeError occurs', async () => {
  await expect(loader.loadMany([1, 2, 3, 4, 5, 6])).rejects.toMatchSnapshot();
});
