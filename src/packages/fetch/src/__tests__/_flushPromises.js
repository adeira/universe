// @flow

export default function flushPromises() {
  // https://blog.rescale.com/testing-promise-side-effects-with-asyncawait/
  return new Promise<any>(resolve => setImmediate(resolve));
}
