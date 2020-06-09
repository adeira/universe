// @flow

export default function flushPromises(): Promise<any> {
  // https://blog.rescale.com/testing-promise-side-effects-with-asyncawait/
  return new Promise((resolve) => setImmediate(resolve));
}
