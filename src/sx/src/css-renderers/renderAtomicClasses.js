// @flow strict

import renderAtomicClass from './renderAtomicClass';

type Input = {|
  +className: string,
  +styleName: string,
  +styleValue: string,
  +pseudo?: string,
|};

export default function renderAtomicClasses(inputArray: $ReadOnlyArray<Input>): string {
  let css = '';
  let prefix = '';
  for (const input of inputArray) {
    css += `${prefix}${renderAtomicClass(input)}`;
    prefix = ' ';
  }
  return css;
}
