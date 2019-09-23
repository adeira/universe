// @flow strict

import { isObject } from '@kiwicom/js';

export default function isObjectEmpty(obj: mixed): boolean %checks {
  // https://stackoverflow.com/a/32108184/3135248
  return isObject(obj) && Object.entries(obj).length === 0 && obj.constructor === Object;
}
