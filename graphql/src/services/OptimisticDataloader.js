// @flow

import DataLoader from 'dataloader';

// any because it must be very generic (accepts everything)
type K = any;
type V = any;

/**
 * Original data-loader kills load batch if one of this response values is
 * Error instance. This optimistic data-loader keeps Error value as a valid
 * response. This means that it's possible to return as many responses
 * as possible and convert Errors to the error messages in the response
 * if necessary.
 *
 * @see https://github.com/facebook/dataloader/issues/41
 */
export default class OptimisticDataloader extends DataLoader<K, V> {
  constructor(batchLoadFn: Function) {
    super(batchLoadFn);
  }

  loadMany = (keys: K[]): Promise<V[]> => {
    if (!Array.isArray(keys)) {
      throw new TypeError(
        'The loader.loadMany() function must be called with Array<key> ' +
          `but got: ${keys}.`,
      );
    }

    return Promise.all(
      keys.map(key =>
        this.load(key).catch(error => {
          if (error instanceof TypeError) {
            // original data-loader throws TypeErrors
            throw error;
          }
          return error;
        }),
      ),
    );
  };
}
