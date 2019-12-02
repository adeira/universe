// @flow strict

// https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser/31090240#31090240
// eslint-disable-next-line no-new-func
const testIsBrowser = new Function('try {return this===window;}catch(e){ return false;}');

export default function isBrowser(): boolean {
  // We need to add !! to be able to type the return type as boolean
  return !!testIsBrowser();
}
